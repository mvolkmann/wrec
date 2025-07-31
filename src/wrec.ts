const FIRST_CHAR = 'a-zA-Z_$';
const OTHER_CHAR = FIRST_CHAR + '0-9';
const IDENTIFIER = `[${FIRST_CHAR}][${OTHER_CHAR}]*`;
const REFERENCE_RE = new RegExp(`^this.${IDENTIFIER}$`);
const REFERENCES_RE = new RegExp(`this.${IDENTIFIER}`, 'g');
const SKIP = 'this.'.length;

type HTMLValueElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export function createElement(
  name: string,
  attributes: Record<string, string>,
  innerHTML: string
): HTMLElement {
  const element = document.createElement(name);
  if (attributes) {
    for (const [attrName, value] of Object.entries(attributes)) {
      element.setAttribute(attrName, value);
    }
  }
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

type AnyClass = new (...args: any[]) => any;

const defaultForType = (type: AnyClass) =>
  type === Number ? 0 : type === Boolean ? false : '';

function isPrimitive(value: unknown) {
  const t = typeof value;
  return t === 'string' || t === 'number' || t === 'boolean';
}

function updateAttribute(
  element: HTMLElement,
  attrName: string,
  value: string | number | boolean
) {
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
    element.setAttribute(attrName, String(value));
  }
}

function updateValue(
  element: HTMLElement | CSSStyleRule,
  attrName: string,
  value: string
) {
  if (element instanceof CSSRule) {
    element.style.setProperty(attrName, value); // CSS variable
  } else {
    updateAttribute(element, attrName, value);
  }
}

class Wrec extends HTMLElement {
  static #propToAttrMap = new Map();
  static #attrToPropMap = new Map();
  static css = '';
  static html = '';
  static formAssociated = false;
  static processed = false;
  static properties: Record<string, any> = {};
  static propToComputedMap: Map<string, string[][]> | null = null;
  static propToExprsMap: Map<string, string[]> | null = null;
  static template: HTMLTemplateElement | null = null;

  #ctor: typeof Wrec = this.constructor as typeof Wrec;
  #exprToRefsMap = new Map();
  #formData;
  #internals: ElementInternals | null = null;
  #propToBindingsMap = new Map();
  // This must be an instance property and cannot be private because
  // child components need to access the property in their parent component.
  propToParentPropMap = new Map();

  // This tells TypeScript that it's okay to access properties by string keys.
  [key: string]: any;

  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    const ctor = this.#ctor;
    if (!ctor.properties) ctor.properties = {};
    if (!ctor.propToComputedMap) ctor.propToComputedMap = new Map();
    if (!ctor.propToExprsMap) ctor.propToExprsMap = new Map();

    if (ctor.formAssociated) {
      this.#internals = this.attachInternals();
      this.#formData = new FormData();
      this.#internals.setFormValue(this.#formData);
    }
  }

  attributeChangedCallback(
    attrName: string,
    _: string,
    newValue: string | number | boolean | undefined
  ) {
    // Update corresponding property.
    const propName = Wrec.getPropName(attrName);
    const value = this.#typedValue(propName, String(newValue));
    this[propName] = value;
    this.#setFormValue(propName, String(value));
  }

  // attrName must be "value" OR undefined!
  #bind(
    element: HTMLElement,
    propName: string,
    attrName: string | null,
    eventName: string
  ) {
    element.addEventListener(eventName, (event: Event) => {
      const target = event.target as HTMLValueElement;
      this[propName] = target.value;
    });

    let bindings = this.#propToBindingsMap.get(propName);
    if (!bindings) {
      bindings = [];
      this.#propToBindingsMap.set(propName, bindings);
    }
    bindings.push(attrName ? {element, attrName} : element);
  }

  #buildDOM() {
    const ctor = this.#ctor;
    let template = ctor.template;
    if (!template) {
      template = ctor.template = document.createElement('template');
      let text = ctor.css ? `<style>${ctor.css}</style>` : '';
      text += ctor.html;
      template.innerHTML = text;
    }
    this.shadowRoot?.replaceChildren(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#validateAttributes();
    this.#defineProps();
    this.#buildDOM();

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      if (this.shadowRoot) {
        this.#wireEvents(this.shadowRoot);
        this.#makeReactive(this.shadowRoot);
        // This line cannot be moved to the #registerPlaceholders method
        // because that needs to be called multiple times
        // for the first instance of each Wrec subclass.
        this.#ctor.processed = true;
      }
      this.#computeProps();
    });
  }

  #computeProps() {
    const ctor = this.#ctor;
    const {properties} = ctor;
    for (const [propName, {computed}] of Object.entries(properties)) {
      if (computed) this[propName] = this.#evaluateInContext(computed);
    }
  }

  #defineProps() {
    const ctor = this.#ctor;
    const {observedAttributes, properties} = ctor;
    for (const [propName, config] of Object.entries(properties)) {
      this.#defineProp(propName, config, observedAttributes);
    }
  }

  #defineProp(
    propName: string,
    config: Record<string, any>,
    observedAttributes: string[]
  ) {
    const attrName = Wrec.getAttrName(propName);
    if (config.required && !this.hasAttribute(attrName)) {
      this.#throw(this, propName, 'is a required attribute');
    }

    // Copy the property value to a private property.
    // The property is replaced below with Object.defineProperty.
    const {type, value} = config;
    const typedValue =
      type === Boolean
        ? value || this.hasAttribute(attrName)
        : observedAttributes.includes(attrName) && this.hasAttribute(attrName)
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
        const map = this.#ctor.propToComputedMap;
        const computes = map.get(propName) || [];
        for (const [computedName, expr] of computes) {
          this[computedName] = this.#evaluateInContext(expr);
        }

        // If there is a matching attribute on the custom element,
        // update that attribute.
        if (isPrimitive(value) && this.hasAttribute(attrName)) {
          const oldValue =
            type === Boolean
              ? this.hasAttribute(attrName)
              : this.#typedAttribute(propName, attrName);
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

  #evaluateAttributes(element: HTMLElement) {
    //const isWC = element.localName.includes('-');
    const isWC = element instanceof Wrec;

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

        (element as any)[propName] = value;

        let [realAttrName, eventName] = attrName.split(':');
        if (realAttrName === 'value') {
          if (eventName) {
            element.setAttribute(realAttrName, this[propName]);
          } else {
            eventName = 'change';
          }
          this.#bind(element, propName, realAttrName, eventName);
        }

        // If the element is a wrec web component,
        // save a mapping from the attribute name in this web component
        // to the property name in the parent web component.
        if (isWC) {
          (element as Wrec).propToParentPropMap.set(
            Wrec.getPropName(realAttrName),
            propName
          );
        }
      }

      this.#registerPlaceholders(text, element, attrName);
    }
  }

  #evaluateInContext(expr: string) {
    // oxlint-disable-next-line no-eval
    return (() => eval(expr)).call(this);
  }

  #evaluateText(element: HTMLElement) {
    const {localName} = element;

    if (localName === 'style') {
      const {sheet} = element as HTMLStyleElement;
      const rules = sheet?.cssRules ?? [];
      const ruleArray = Array.from(rules) as CSSStyleRule[];
      for (const rule of ruleArray) {
        if (rule.constructor === CSSStyleRule) {
          const props = Array.from((rule as CSSStyleRule).style);
          for (const prop of props) {
            if (prop.startsWith('--')) {
              const value = rule.style.getPropertyValue(prop);
              this.#registerPlaceholders(value, rule, prop);
            }
          }
        }
      }
    } else {
      let text = element.textContent?.trim() ?? '';

      // The browser strips the text from some element types that it deems to
      // be invalid.  Examples include table, thead, tbody, tr, th, and td.
      // To place a JavaScript expression in those elements,
      // wrap it in an HTML comment
      if (!text) {
        element.childNodes.forEach(node => {
          if (node.nodeType === Node.COMMENT_NODE) {
            text += node?.textContent?.trim() ?? '';
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

  static getAttrName(propName: string) {
    let attrName = Wrec.#propToAttrMap.get(propName);
    if (!attrName) {
      attrName = propName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      Wrec.#propToAttrMap.set(propName, attrName);
    }
    return attrName;
  }

  static getPropName(attrName: string) {
    let propName = Wrec.#attrToPropMap.get(attrName);
    if (!propName) {
      propName = attrName.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      Wrec.#attrToPropMap.set(attrName, propName);
    }
    return propName;
  }

  #makeReactive(root: ShadowRoot | HTMLElement) {
    const elements = Array.from(root.querySelectorAll('*')) as HTMLElement[];
    for (const element of elements) {
      this.#evaluateAttributes(element);

      // If the element has no child elements, evaluate its text content.
      if (!element.firstElementChild) this.#evaluateText(element);
    }
    /* These lines are useful for debugging.
    if (this.constructor.name === 'BindingDemo') {
    console.log('=== this.constructor.name =', this.constructor.name);
    console.log('propToExprsMap =', this.#ctor.propToExprsMap);
    console.log('#exprToRefsMap =', this.#exprToRefsMap);
    console.log('propToComputedMap =', this.#ctor.propToComputedMap);
    console.log('propToParentPropMap =', this.propToParentPropMap);
    console.log('\n');
    }
    */
  }

  static get observedAttributes() {
    return Object.keys(this.properties || {}).map(Wrec.getAttrName);
  }

  #propRefName(element: HTMLElement, text: string | null) {
    if (!text || !REFERENCE_RE.test(text)) return;
    const propName = text.substring(SKIP);
    if (this[propName] === undefined) {
      this.#throwInvalidRef(element, '', propName);
    }
    return propName;
  }

  #react(propName: string) {
    // Update all expression references.
    const ctor = this.#ctor;
    const map = ctor.propToExprsMap;
    const exprs = map!.get(propName) || [];
    for (const expr of exprs) {
      const value = this.#evaluateInContext(expr);
      const refs = this.#exprToRefsMap.get(expr) || [];
      for (const ref of refs) {
        if (ref instanceof HTMLElement) {
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

  #registerComputedProp(propName: string, config: Record<string, any>) {
    const {computed, uses} = config;
    const map = this.#ctor.propToComputedMap!;

    function register(referencedProp: string, expr: string) {
      let computes = map.get(referencedProp);
      if (!computes) {
        computes = [];
        map.set(referencedProp, computes);
      }
      // Each element is a tuple of a property name
      // and an expression that uses the property.
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

  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #registerPlaceholders(
    text: string | null,
    element: HTMLElement | CSSStyleRule,
    attrName: string | undefined = undefined
  ) {
    if (!text) return;

    const matches = this.#validateExpression(element, attrName, text);
    if (!matches) {
      // Handle escaped periods in expressions.
      const value = text.replaceAll('this..', 'this.');
      if (attrName) {
        updateValue(element, attrName, value);
      } else if ('textContent' in element) {
        element.textContent = value;
      }
      return;
    }

    // Only map properties to expressions once for each web component because
    // the mapping will be the same for every instance of the web component.
    const ctor = this.#ctor;
    if (!ctor.processed) {
      matches.forEach(capture => {
        const propName = capture.substring(SKIP);
        if (typeof this[propName] === 'function') return;

        const map = ctor.propToExprsMap;
        let exprs = map!.get(propName);
        if (!exprs) {
          exprs = [];
          map!.set(propName, exprs);
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

  #setFormValue(propName: string, value: string) {
    if (!this.#formData) return;
    this.#formData.set(propName, value);
    this.#internals?.setFormValue(this.#formData);
  }

  #throw(
    element: HTMLElement | CSSStyleRule | null,
    attrName: string | undefined,
    message: string
  ) {
    const ctor = this.#ctor;
    const name =
      element instanceof HTMLElement ? element.localName : 'CSS rule';
    throw new Error(
      `component ${ctor.elementName()}` +
        (element ? `, element "${name}"` : '') +
        (attrName ? `, attribute "${attrName}"` : '') +
        ` ${message}`
    );
  }

  #throwInvalidRef(
    element: HTMLElement | CSSStyleRule | null,
    attrName: string | undefined,
    propName: string
  ) {
    this.#throw(element, attrName, `refers to missing property "${propName}"`);
  }

  #typedAttribute(propName: string, attrName: string) {
    return this.#typedValue(propName, this.getAttribute(attrName));
  }

  #typedValue(propName: string, stringValue: string | null) {
    if (stringValue?.match(REFERENCES_RE)) return stringValue;

    const ctor = this.#ctor;
    const {type} = ctor.properties[propName];
    if (type === String) return stringValue;
    if (type === Number) {
      const number = Number(stringValue);
      if (!isNaN(number)) return number;
      this.#throw(null, propName, `must be a number, but was "${stringValue}"`);
    }
    if (type === Boolean) {
      if (stringValue === 'true') return true;
      if (stringValue === 'false' || stringValue === 'null') return false;
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

  #updateBindings(propName: string) {
    const value = this[propName];
    const bindings = this.#propToBindingsMap.get(propName) || [];
    for (const binding of bindings) {
      if (binding instanceof HTMLElement) {
        if (binding.localName === 'textarea') {
          (binding as HTMLTextAreaElement).value = value;
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

  #updateElementContent(element: HTMLElement | CSSStyleRule, value: string) {
    const isHTML = element instanceof HTMLElement;
    const localName = isHTML ? element.localName : '';
    const t = typeof value;
    if (t !== 'string' && t !== 'number') {
      this.#throw(
        element,
        undefined,
        ` computed content is not a string or number`
      );
    }

    if (localName === 'textarea') {
      (element as HTMLTextAreaElement).value = value;
    } else if (isHTML && t === 'string' && value.trim().startsWith('<')) {
      element.innerHTML = value;
      this.#wireEvents(element);
      // This is necessary in case the new HTML contains JavaScript expressions.
      this.#makeReactive(element);
    } else if (isHTML) {
      element.textContent = value;
    }
    //TODO: Do you ever need to update a CSSStyleRule?
  }

  #validateAttributes() {
    const ctor = this.#ctor;
    const propNames = new Set(Object.keys(ctor.properties));
    for (const attrName of this.getAttributeNames()) {
      if (attrName === 'id') continue;
      if (attrName.startsWith('on')) continue;
      if (!propNames.has(Wrec.getPropName(attrName))) {
        this.#throw(null, attrName, 'is not a supported attribute');
      }
    }
  }

  #validateExpression(
    element: HTMLElement | CSSStyleRule,
    attrName: string | undefined,
    expr: string
  ) {
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

  #wireEvents(root: ShadowRoot | HTMLElement) {
    const elements = Array.from(root.querySelectorAll('*')) as HTMLElement[];
    for (const element of elements) {
      // We don't want to remove attributes while we are iterating over them.
      const attributesToRemove = [];

      for (const attr of Array.from(element.attributes)) {
        const attrName = attr.name;
        if (attrName.startsWith('on')) {
          const eventName = attrName.slice(2).toLowerCase();
          const attrValue = attr.value;
          this.#validateExpression(element, attrName, attrValue);

          let fn;
          if (typeof this[attrValue] === 'function') {
            fn = (event: Event) => this[attrValue](event);
          } else {
            this.#validateExpression(element, attrName, attrValue);
            // oxlint-disable-next-line no-eval no-unused-vars
            fn = () => this.#evaluateInContext(attrValue);
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
