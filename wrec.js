const FIRST_CHAR = 'a-zA-Z_$';
const OTHER_CHAR = FIRST_CHAR + '0-9';
const IDENTIFIER = `[${FIRST_CHAR}][${OTHER_CHAR}]*`;
const REFERENCE_RE = new RegExp(`^this.${IDENTIFIER}$`);
const REFERENCES_RE = new RegExp(`this.${IDENTIFIER}`, 'g');
const SKIP = 'this.'.length;

export function createElement(name, attributes, innerHTML) {
  const element = document.createElement(name);
  if (attributes) {
    for (const [attrName, value] of Object.entries(attributes)) {
      element.setAttribute(attrName, value);
    }
  }
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

const defaultForType = type =>
  type === Number ? 0 : type === Boolean ? false : '';

function isPrimitive(value) {
  const t = typeof value;
  return t === 'string' || t === 'number' || t === 'boolean';
}

function updateAttribute(element, attrName, value) {
  if (!isPrimitive(value)) return;

  const currentValue = element.getAttribute(attrName);
  if (typeof value === 'boolean') {
    if (value) {
      if (currentValue !== attrName) {
        element.setAttribute(attrName, attrName);
      }
    } else {
      element.removeAttribute(attrName);
    }
  } else if (currentValue !== value) {
    element.setAttribute(attrName, value);
  }
}

function updateValue(element, attrName, value) {
  if (element instanceof CSSRule) {
    element.style.setProperty(attrName, value); // CSS variable
  } else {
    updateAttribute(element, attrName, value);
  }
}

class Wrec extends HTMLElement {
  static #propToAttrMap = new Map();
  static #attrToPropMap = new Map();

  #exprToRefsMap = new Map();
  #formData;
  #internals;
  #propToBindingsMap = new Map();
  // This must be an instance property and cannot be private because
  // child components need to access the property in their parent component.
  propToParentPropMap = new Map();

  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    if (!this.constructor.properties) this.constructor.properties = {};

    let map = this.constructor['#propToExprsMap'];
    if (!map) this.constructor['#propToExprsMap'] = new Map();

    if (this.constructor.formAssociated) {
      this.#internals = this.attachInternals();
      this.#formData = new FormData();
      this.#internals.setFormValue(this.#formData);
    }
  }

  attributeChangedCallback(attrName, _, newValue) {
    // Update corresponding property.
    const propName = Wrec.getPropName(attrName);
    const value = this.#typedValue(propName, newValue);
    this[propName] = value;
    this.#setFormValue(propName, value);
  }

  // attrName must be "value" OR undefined!
  #bind(element, propName, attrName, eventName) {
    element.addEventListener(eventName, event => {
      this[propName] = event.target.value;
    });

    let bindings = this.#propToBindingsMap.get(propName);
    if (!bindings) {
      bindings = [];
      this.#propToBindingsMap.set(propName, bindings);
    }
    bindings.push(attrName ? {element, attrName} : element);
  }

  #buildDOM() {
    const clazz = this.constructor;
    let {_template} = clazz;
    if (!_template) {
      _template = clazz.template = document.createElement('template');
      let text = clazz.css ? `<style>${clazz.css}</style>` : '';
      text += clazz.html;
      _template.innerHTML = text;
    }
    this.shadowRoot.replaceChildren(_template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#validateAttributes();
    this.#defineProps();
    this.#buildDOM();

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      this.#wireEvents(this.shadowRoot);
      this.#makeReactive(this.shadowRoot);
      this.constructor.processed = true;
      this.#computeProps();
    });
  }

  #computeProps() {
    const {properties} = this.constructor;
    for (const [propName, {computed}] of Object.entries(properties)) {
      if (computed) this[propName] = this.#evaluateInContext(computed);
    }
  }

  #defineProps() {
    const {observedAttributes, properties} = this.constructor;
    for (const [propName, config] of Object.entries(properties)) {
      this.#defineProp(propName, config, observedAttributes);
    }
  }

  #defineProp(propName, config, observedAttributes) {
    const attrName = Wrec.getAttrName(propName);
    if (config.required && !this.hasAttribute(attrName)) {
      this.#throw(this, propName, 'is a required attribute');
    }

    // Copy the property value to a private property.
    // The property is replaced below with Object.defineProperty.
    const {type, value} = config;
    const typedValue =
      observedAttributes.includes(attrName) && this.hasAttribute(attrName)
        ? this.#typedAttribute(propName, attrName)
        : value || defaultForType(type);
    const privateName = '#' + propName;
    this[privateName] = typedValue;

    if (config.computed) this.#registerComputedProp(propName, config);

    Object.defineProperty(this, propName, {
      enumerable: true,
      get() {
        return this[privateName];
      },
      set(value) {
        const oldValue = this[privateName];
        if (value === oldValue) return;

        this[privateName] = value;

        // Update all computed properties that reference this property.
        let map = this.constructor['#propToComputedMap'];
        if (map) {
          const computes = map.get(propName) || [];
          for (const [computedName, expr] of computes) {
            this[computedName] = this.#evaluateInContext(expr);
          }
        }

        // If there is a matching attribute on the custom element,
        // update that attribute.
        if (isPrimitive(value) && this.hasAttribute(attrName)) {
          const oldValue = this.#typedAttribute(propName, attrName);
          if (value !== oldValue) updateAttribute(this, propName, value);
        }

        this.#react(propName);

        // If this property is bound to a parent web component property,
        // update that as well.
        const parentProp = this.propToParentPropMap.get(propName);
        if (parentProp) {
          const parent = this.getRootNode().host;
          parent[parentProp] = value;
        }

        if (isPrimitive(value)) this.#setFormValue(propName, value);

        if (this.propertyChangedCallback) {
          this.propertyChangedCallback(propName, oldValue, value);
        }

        if (config.dispatch) {
          this.dispatchEvent(
            new CustomEvent('change', {
              bubbles: true, // up DOM tree
              composed: true, // can pass through shadow DOM
              detail: {propName}
            })
          );
        }
      }
    });
  }

  // This inserts a dash before each uppercase letter
  // that is preceded by a lowercase letter or digit.
  static elementName() {
    return this.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  #evaluateAttributes(element) {
    const isWC = element.localName.includes('-');

    for (const attrName of element.getAttributeNames()) {
      const text = element.getAttribute(attrName);

      // If the attribute value is a single property reference,
      // configure two-way data binding.
      const propName = this.#propRefName(element, text);
      if (propName) {
        const value = this[propName];
        if (value === undefined) {
          this.#throwInvalidRef(element, attrName, propName);
        }

        element[propName] = value;

        let [realAttrName, eventName] = attrName.split(':');
        if (realAttrName === 'value') {
          if (eventName) {
            element.setAttribute(realAttrName, this[propName]);
          } else {
            eventName = 'change';
          }
          this.#bind(element, propName, realAttrName, eventName);
        }

        // If the element is a web component,
        // save a mapping from the attribute name in this web component
        // to the property name in the parent web component.
        if (isWC) {
          element.propToParentPropMap.set(
            Wrec.getPropName(realAttrName),
            propName
          );
        }
      }

      this.#registerPlaceholders(text, element, attrName);
    }
  }

  #evaluateInContext(expr) {
    // oxlint-disable-next-line no-eval
    return (() => eval(expr)).call(this);
  }

  #evaluateText(element) {
    const {localName} = element;

    if (localName === 'style') {
      for (const rule of element.sheet.cssRules) {
        if (rule.type === CSSRule.STYLE_RULE) {
          const props = [...rule.style];
          for (const prop of props) {
            if (prop.startsWith('--')) {
              const value = rule.style.getPropertyValue(prop);
              this.#registerPlaceholders(value, rule, prop);
            }
          }
        }
      }
    } else {
      let text = element.textContent.trim();

      // The browser strips the text from some element types that it deems to
      // be invalid.  Examples include table, thead, tbody, tr, th, and td.
      // To place a JavaScript expression in those elements,
      // wrap it in an HTML comment
      if (!text) {
        element.childNodes.forEach(node => {
          if (node.nodeType === Node.COMMENT_NODE) {
            text += node.textContent.trim();
          }
        });
      }

      // Only add a binding the element is a "textarea" and
      // its text content is a single property reference.
      const propName = this.#propRefName(element, text);
      if (localName === 'textarea' && propName) {
        // Configure data binding.
        this.#bind(element, propName, null, 'change');
        element.textContent = this[propName];
      } else {
        this.#registerPlaceholders(text, element);
      }
    }
  }

  static getAttrName(propName) {
    let attrName = Wrec.#propToAttrMap.get(propName);
    if (!attrName) {
      attrName = propName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      Wrec.#propToAttrMap.set(propName, attrName);
    }
    return attrName;
  }

  static getPropName(attrName) {
    let propName = Wrec.#attrToPropMap.get(attrName);
    if (!propName) {
      propName = attrName.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      Wrec.#attrToPropMap.set(attrName, propName);
    }
    return propName;
  }

  #makeReactive(root) {
    const elements = root.querySelectorAll('*');
    for (const element of elements) {
      this.#evaluateAttributes(element);

      // If the element has no child elements, evaluate its text content.
      if (!element.firstElementChild) this.#evaluateText(element);
    }
    /* These lines are useful for debugging.
    if (this.constructor.name === 'TablePlus') {
      console.log('#propToExprsMap =', this.constructor['#propToExprsMap']);
      console.log('#exprToRefsMap =', this.#exprToRefsMap);
      console.log(
        '#propToComputedMap =',
        this.constructor['#propToComputedMap']
      );
      console.log('this.constructor.name =', this.constructor.name);
      console.log('propToParentPropMap =', this.propToParentPropMap);
    }
    */
  }

  static get observedAttributes() {
    return Object.keys(this.properties || {}).map(Wrec.getAttrName);
  }

  #propRefName(element, text) {
    if (!REFERENCE_RE.test(text)) return;
    const propName = text.substring(SKIP);
    if (this[propName] === undefined) {
      this.#throwInvalidRef(element, null, propName);
    }
    return propName;
  }

  #react(propName) {
    // Update all expression references.
    const map = this.constructor['#propToExprsMap'];
    const exprs = map.get(propName) || [];
    for (const expr of exprs) {
      const value = this.#evaluateInContext(expr);
      const refs = this.#exprToRefsMap.get(expr) || [];
      for (const ref of refs) {
        if (ref instanceof Element) {
          this.#updateElementContent(ref, value);
        } else {
          updateValue(ref.element, ref.attrName, value);
        }
      }
    }

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      this.#updateBindings(propName);
    });
  }

  static register() {
    const elementName = this.elementName();
    if (!customElements.get(elementName)) {
      customElements.define(elementName, this);
    }
  }

  #registerComputedProp(propName, config) {
    const {computed, uses} = config;

    let map = this.constructor['#propToComputedMap'];
    if (!map) map = this.constructor['#propToComputedMap'] = new Map();

    function register(referencedProp, expr) {
      let computes = map.get(referencedProp);
      if (!computes) {
        computes = [];
        map.set(referencedProp, computes);
      }
      computes.push([propName, expr]);
    }

    const matches = computed.match(REFERENCES_RE) || [];
    for (const match of matches) {
      const referencedProp = match.substring(SKIP);
      if (this[referencedProp] === undefined) {
        this.#throwInvalidRef(null, propName, referencedProp);
      }
      if (typeof this[referencedProp] !== 'function') {
        register(referencedProp, computed);
      }
    }

    if (uses) {
      for (const use of uses.split(',')) {
        register(use, computed);
      }
    }
  }

  // Do not place untrusted expressions in
  // attribute values or the text content of elements!
  #registerPlaceholders(text, element, attrName) {
    const matches = this.#validateExpression(element, attrName, text);
    if (!matches) {
      const value = text.replaceAll('this..', 'this.');
      if (attrName) {
        updateValue(element, attrName, value);
      } else {
        element.textContent = value;
      }
      return;
    }

    // Only map properties to expressions once for each web component because
    // the mapping will be the same for every instance of the web component.
    if (!this.constructor.processed) {
      matches.forEach(capture => {
        const propName = capture.substring(SKIP);
        const map = this.constructor['#propToExprsMap'];
        let exprs = map.get(propName);
        if (!exprs) {
          exprs = [];
          map.set(propName, exprs);
        }
        if (!exprs.includes(text)) exprs.push(text);
      });
    }

    let refs = this.#exprToRefsMap.get(text);
    if (!refs) {
      refs = [];
      this.#exprToRefsMap.set(text, refs);
    }
    refs.push(attrName ? {element, attrName} : element);

    const value = this.#evaluateInContext(text);
    if (attrName) {
      updateValue(element, attrName, value);
    } else {
      this.#updateElementContent(element, value);
    }
  }

  #setFormValue(propName, value) {
    if (!this.#formData) return;
    this.#formData.set(propName, value);
    this.#internals.setFormValue(this.#formData);
  }

  #throw(element, attrName, message) {
    throw new Error(
      `component ${this.constructor.elementName()}` +
        (element ? `, element "${element.localName}"` : '') +
        (attrName ? `, attribute "${attrName}"` : '') +
        ` ${message}`
    );
  }

  #throwInvalidRef(element, attrName, propName) {
    this.#throw(element, attrName, `refers to missing property "${propName}"`);
  }

  #typedAttribute(propName, attrName) {
    return this.#typedValue(propName, this.getAttribute(attrName));
  }

  #typedValue(propName, stringValue) {
    if (stringValue?.match(REFERENCES_RE)) return stringValue;

    const {type} = this.constructor.properties[propName];
    if (type === String) return stringValue;
    if (type === Number) {
      const number = Number(stringValue);
      if (!isNaN(number)) return number;
      this.#throw(null, propName, `must be a number, but was "${stringValue}"`);
    }
    if (type === Boolean) {
      if (stringValue === 'true') return true;
      if (stringValue === 'false') return false;
      if (stringValue && stringValue !== propName) {
        this.#throw(
          null,
          propName,
          'is a Boolean attribute, so its value ' +
            'must match attribute name or be missing'
        );
      }
      return stringValue === propName;
    }
    this.#throw(null, propName, 'does not specify its type');
  }

  #updateBindings(propName) {
    const value = this[propName];
    const bindings = this.#propToBindingsMap.get(propName) || [];
    for (const binding of bindings) {
      if (binding instanceof Element) {
        if (binding.localName === 'textarea') {
          binding.value = value;
        } else {
          binding.textContent = value;
        }
      } else {
        const {element, attrName} = binding;
        updateAttribute(element, attrName, value);
        element[attrName] = value;
      }
    }
  }

  #updateElementContent(element, value) {
    const {localName} = element;
    const t = typeof value;
    if (t !== 'string' && t !== 'number') {
      this.#throw(element, null, ` computed content is not a string or number`);
    }

    if (localName === 'textarea') {
      element.value = value;
    } else if (t === 'string' && value.trim().startsWith('<')) {
      element.innerHTML = value;
      this.#wireEvents(element);
      this.#makeReactive(element);
    } else {
      element.textContent = value;
    }
  }

  #validateAttributes() {
    const propNames = new Set(Object.keys(this.constructor.properties));
    for (const attrName of this.getAttributeNames()) {
      if (attrName === 'id') continue;
      if (attrName.startsWith('on')) continue;
      if (!propNames.has(Wrec.getPropName(attrName))) {
        this.#throw(null, attrName, 'is not a supported attribute');
      }
    }
  }

  #validateExpression(element, attrName, expr) {
    const matches = expr.match(REFERENCES_RE);
    if (!matches) return;

    matches.forEach(capture => {
      const propName = capture.substring(SKIP);
      if (this[propName] === undefined) {
        this.#throwInvalidRef(element, attrName, propName);
      }
    });

    return matches;
  }

  #wireEvents(root) {
    for (const element of root.querySelectorAll('*')) {
      // We don't want to remove attributes while we are iterating over them.
      const attributesToRemove = [];

      for (const attr of element.attributes) {
        const attrName = attr.name;
        if (attrName.startsWith('on')) {
          const eventName = attrName.slice(2).toLowerCase();
          const attrValue = attr.value;
          this.#validateExpression(element, attrName, attrValue);

          let fn;
          if (typeof this[attrValue] === 'function') {
            fn = event => this[attrValue](event);
          } else {
            this.#validateExpression(element, attrName, attrValue);
            // oxlint-disable-next-line no-eval no-unused-vars
            fn = () => eval(attrValue);
          }
          element.addEventListener(eventName, fn);
          attributesToRemove.push(attrName);
        }
      }

      for (const attrName of attributesToRemove) {
        element.removeAttribute(attrName);
      }
    }
  }
}

export default Wrec;

// These enable the VS Code extensions Prettier and es6-string-html to
// provide formatting and syntax highlighting of tagged template literals.
export const css = String.raw;
export const html = String.raw;
