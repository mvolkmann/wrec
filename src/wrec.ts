import type {ChangeListener, State} from './state';

type AnyClass = new (...args: any[]) => any;

type HTMLValueElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

type Ref =
  | HTMLElement
  | CSSStyleRule
  | {element: HTMLElement | CSSStyleRule; attrName: string};

class WrecError extends Error {}

const CSS_PROPERTY_RE = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g;
const FIRST_CHAR = 'a-zA-Z_$';
const OTHER_CHAR = FIRST_CHAR + '0-9';
const IDENTIFIER = `[${FIRST_CHAR}][${OTHER_CHAR}]*`;
const HTML_COMMENT_TEXT_RE = /<!--\s*(.*?)\s*-->/;
const HTML_ELEMENT_TEXT_RE = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g;
const REF_RE = new RegExp(`^this\\.${IDENTIFIER}$`);
const REFS_RE = new RegExp(`this\\.${IDENTIFIER}(\\.${IDENTIFIER})*`, 'g');
const REFS_TEST_RE = new RegExp(`this\\.${IDENTIFIER}(\\.${IDENTIFIER})*`);
const SKIP = 'this.'.length;

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

const defaultForType = (type: AnyClass) =>
  type === String
    ? ''
    : type === Number
    ? 0
    : type === Boolean
    ? false
    : type === Array
    ? []
    : type === Object
    ? {}
    : undefined;

// This differs from document.getElementById
// in that it searches across open shadow DOMs.
function getElementById(root: Element, id: string): Element | null {
  if (root.id === id) return root;

  const {shadowRoot} = root;
  if (shadowRoot) {
    for (const child of Array.from(shadowRoot.children)) {
      const el = getElementById(child, id);
      if (el) return el;
    }
  }

  for (const child of Array.from(root.children)) {
    const el = getElementById(child, id);
    if (el) return el;
  }

  return null;
}

// This takes a string like "this.foo.bar" and returns "foo".
const getPropName = (str: string) => str.substring(SKIP).split('.')[0];

function interpolate(strings: TemplateStringsArray, values: unknown[]) {
  let result = strings[0];
  values.forEach((value, i) => {
    result += value + strings[i + 1];
  });
  return result;
}

function isPrimitive(value: unknown) {
  const t = typeof value;
  return t === 'string' || t === 'number' || t === 'boolean';
}

const removeHtmlComments = (str: string) => str.replace(/<!--[\s\S]*?-->/g, '');

// This returns a new string where a specified substring is replaced.
function replace(
  full: string,
  index: number,
  length: number,
  replacement: string
): string {
  return full.slice(0, index) + replacement + full.slice(index + length);
}

function stringToNumber(str: string | null): number {
  const n = Number(str);
  if (isNaN(n)) throw new WrecError(`Cannot convert "${str}" to a number.`);
  return n;
}

function updateAttribute(
  element: HTMLElement,
  attrName: string,
  value: string | number | boolean
) {
  // Attributes can only be set to primitive values.
  if (isPrimitive(value) && typeof value !== 'boolean') {
    // Set the attribute.
    const currentValue = element.getAttribute(attrName);
    if (currentValue !== value) {
      element.setAttribute(attrName, String(value));
    }
  } else {
    // Set the corresponding property.
    const propName = Wrec.getPropName(attrName);
    (element as Record<string, any>)[propName] = value;
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

class Wrec extends HTMLElement implements ChangeListener {
  static #attrToPropMap = new Map<string, string>();
  static #idToPropertiesMap = new Map<string, any>();
  static #propToAttrMap = new Map<string, string>();
  static css = '';
  static html = '';
  static formAssociated = false;
  static properties: Record<string, any> = {};
  static propToComputedMap: Map<string, string[][]> | null = null;
  static propToExprsMap: Map<string, string[]> | null = null;
  static template: HTMLTemplateElement | null = null;

  #ctor: typeof Wrec = this.constructor as typeof Wrec;
  #exprToRefsMap = new Map<string, Ref[]>();
  #formData;
  #internals: ElementInternals | null = null;
  #propToBindingsMap = new Map<string, Ref[]>();
  // This must be an instance property and cannot be private because
  // child components need to access the property in their parent component.
  #propToParentPropMap = new Map<string, string>();
  #stateToComponentPropertyMap = new Map<string, string>();

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
    oldValue: string,
    newValue: string | number | boolean | undefined
  ) {
    // Update corresponding property.
    const propName = Wrec.getPropName(attrName);
    const value = this.#typedValue(propName, String(newValue));
    this[propName] = value;
    this.#setFormValue(propName, String(value));
    this.propertyChangedCallback(propName, oldValue, newValue);
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
      const {value} = target;
      const {type} = this.#ctor.properties[propName];
      this[propName] = type === Number ? stringToNumber(value) : value;
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

  changed(
    stateId: symbol,
    stateProp: string,
    _oldStateValue: unknown,
    newStateValue: unknown
  ) {
    const stateKey = `${stateId.toString()}:${stateProp}`;
    const componentProp = this.#stateToComponentPropertyMap.get(stateKey);
    if (componentProp) this[componentProp] = newStateValue;
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
        Wrec.#setProperties();
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

  static dataForId(data: Record<string, any>): string {
    const id = crypto.randomUUID();
    Wrec.#idToPropertiesMap.set(id, data);
    return id;
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
    const has = this.hasAttribute(attrName);
    if (config.required && !has) {
      this.#throw(this, propName, 'is a required attribute');
    }

    // Copy the property value to a private property.
    // The property is replaced below with Object.defineProperty.
    const {type, value} = config;
    const typedValue =
      type === Boolean
        ? value || has
        : observedAttributes.includes(attrName) && has
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
        if (type === Number && typeof value === 'string') {
          value = stringToNumber(value);
        }
        const oldValue = this[privateName];
        if (value === oldValue) return;

        this.#validateType(propName, type, value);

        this[privateName] = value;
        const {state, stateProp} = this.#ctor.properties[propName];
        if (stateProp) state[stateProp] = value;

        this.#updateComputedProperties(propName);
        this.#updateAttribute(propName, type, value, attrName);
        this.#react(propName);
        this.#updateParentProperty(propName, value);
        if (isPrimitive(value)) this.#setFormValue(propName, value);
        this.propertyChangedCallback(propName, oldValue, value);
        if (config.dispatch) this.dispatch('change', {propName});
      }
    });
  }

  disconnectedCallback() {
    //TODO: Should more cleanup be performed here?
    this.#exprToRefsMap.clear();
    this.#propToParentPropMap.clear();
    this.#stateToComponentPropertyMap.clear();
  }

  dispatch(name: string, detail: any) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true, // up DOM tree
        composed: true, // can pass through shadow DOM
        detail
      })
    );
  }

  displayIfSet(value: any, display = 'block') {
    return `display: ${value ? display : 'none'}`;
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
            if ((element as any)['on' + eventName] === undefined) {
              const msg = 'refers to an unsupported event name';
              this.#throw(element, attrName, msg);
            }
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
          (element as Wrec).#propToParentPropMap.set(
            Wrec.getPropName(realAttrName),
            propName
          );
        }
      }

      this.#registerPlaceholders(text, element, attrName);
    }
  }

  #evaluateInContext(expr: string) {
    // This approach is safer than using the eval function.
    const result = new Function('return ' + expr).call(this);
    return Array.isArray(result) ? result.join('') : result;
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
      let commentText = '';

      if (localName === 'textarea') {
        // When an HTML comment appears in a textarea element,
        // a text node is created rather than a comment element.
        const match = element.textContent?.match(HTML_COMMENT_TEXT_RE);
        if (match) commentText = match[1];
      } else {
        const comment = Array.from(element.childNodes).find(
          node => node.nodeType === Node.COMMENT_NODE
        );
        if (comment) commentText = comment.textContent?.trim() ?? '';
      }

      if (commentText) {
        // Only add a binding if the element is a "textarea" and
        // its text content is a single property reference.
        const propName = this.#propRefName(element, commentText);
        if (localName === 'textarea' && propName) {
          // Configure data binding.
          this.#bind(element, propName, null, 'change');
          element.textContent = this[propName];
        } else {
          this.#registerPlaceholders(commentText, element);
        }
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
    if (this.constructor.name === 'DataBinding') {
      console.log('=== this.constructor.name =', this.constructor.name);
      console.log('propToExprsMap =', this.#ctor.propToExprsMap);
      console.log('#exprToRefsMap =', this.#exprToRefsMap);
      console.log('propToComputedMap =', this.#ctor.propToComputedMap);
      console.log('#propToParentPropMap =', this.#propToParentPropMap);
      console.log('\n');
    }
    */
  }

  static get observedAttributes() {
    return Object.keys(this.properties || {}).map(Wrec.getAttrName);
  }

  // Subclasses can override this to add functionality.
  propertyChangedCallback(
    _propName: string,
    _oldValue: unknown,
    _newValue: unknown
  ) {}

  #propRefName(element: HTMLElement, text: string | null) {
    if (!text || !REF_RE.test(text)) return;
    const propName = getPropName(text);
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
      const refs: Ref[] = this.#exprToRefsMap.get(expr) ?? [];
      for (const ref of refs) {
        if (ref instanceof HTMLElement) {
          this.#updateElementContent(ref, value);
        } else if (ref instanceof CSSStyleRule) {
          //TODO: Does something need to be done here?
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

    const matches = computed.match(REFS_RE) || [];
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

    const ctor = this.#ctor;
    matches.forEach(capture => {
      const propName = getPropName(capture);
      if (typeof this[propName] === 'function') return;

      const map = ctor.propToExprsMap;
      let exprs = map!.get(propName);
      if (!exprs) {
        exprs = [];
        map!.set(propName, exprs);
      }
      if (!exprs.includes(text)) exprs.push(text);
    });

    // Remove entries for detached elements.
    for (const [expr, refs] of this.#exprToRefsMap.entries()) {
      for (const ref of refs) {
        const element =
          ref instanceof HTMLElement || ref instanceof CSSStyleRule
            ? ref
            : (ref.element as HTMLElement);
        if (element instanceof CSSStyleRule) continue;
        if (!element.isConnected) {
          this.#exprToRefsMap.set(
            expr,
            refs.filter(r => r !== ref)
          );
        }
      }
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

  static #setProperties() {
    for (const [id, properties] of Wrec.#idToPropertiesMap.entries()) {
      const element = getElementById(document.body, id) as Record<string, any>;
      if (element) {
        for (const [propName, value] of Object.entries(properties)) {
          element[propName] = value;
        }
      }
    }
  }

  #throw(
    element: HTMLElement | CSSStyleRule | null,
    attrName: string | undefined,
    message: string
  ) {
    const ctor = this.#ctor;
    const name =
      element instanceof HTMLElement ? element.localName : 'CSS rule';
    throw new WrecError(
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
    if (stringValue?.match(REFS_RE)) return stringValue;

    const ctor = this.#ctor;
    const {type} = ctor.properties[propName];
    if (!type) this.#throw(null, propName, 'does not specify its type');

    if (type === String) return stringValue;
    if (type === Number) return stringToNumber(stringValue);
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
  }

  // Updates the matching attribute for a property if there is one.
  #updateAttribute(propName: string, type: any, value: any, attrName: string) {
    if (isPrimitive(value) && this.hasAttribute(attrName)) {
      const oldValue =
        type === Boolean
          ? this.hasAttribute(attrName)
          : this.#typedAttribute(propName, attrName);
      if (value !== oldValue) updateAttribute(this, propName, value);
    }
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
      } else if (binding instanceof CSSStyleRule) {
        //TODO: Does something need to be done here?
      } else {
        const {element, attrName} = binding;
        if (element instanceof HTMLElement) {
          const propName = Wrec.getPropName(attrName);
          (element as any)[propName] = value;
        } else if (element instanceof CSSStyleRule) {
          element.style.setProperty(attrName, value);
        }
      }
    }
  }

  // Updates all computed properties that reference this property.
  #updateComputedProperties(propName: string) {
    const map = this.#ctor.propToComputedMap!;
    const computes = map.get(propName) || [];
    for (const [computedName, expr] of computes) {
      this[computedName] = this.#evaluateInContext(expr);
    }
  }

  #updateElementContent(element: HTMLElement | CSSStyleRule, value: string) {
    if (value === undefined) return;

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
      //TODO: Consider sanitizing this HTML.
      element.innerHTML = value;
      this.#wireEvents(element);
      // This is necessary in case the new HTML contains JavaScript expressions.
      this.#makeReactive(element);
    } else if (isHTML) {
      element.textContent = value;
    }
  }

  // Update corresponding parent web component property if bound to one.
  #updateParentProperty(propName: string, value: any) {
    const parentProp = this.#propToParentPropMap.get(propName);
    if (!parentProp) return;

    const root = this.getRootNode();
    if (!(root instanceof ShadowRoot)) return;
    const {host} = root;
    if (!host) return;

    const parent = host as Record<string, any>;
    parent[parentProp] = value;
  }

  /**
   * @param stateName - unique name for th2nd parameter State object
   * @param state - State object
   * @param map - object whose keys are state properties and
   * whose values are component properties
   */
  useState(state: State, map: Record<string, string>) {
    for (const [stateProp, componentProp] of Object.entries(map)) {
      const stateKey = `${state.id.toString()}:${stateProp}`;
      this.#stateToComponentPropertyMap.set(stateKey, componentProp);
      const value = state[stateProp];
      if (value !== undefined) this[componentProp] = value;
      const config = this.#ctor.properties[componentProp];
      config.state = state;
      config.stateProp = stateProp;
    }
    state.addListener(this, Object.keys(map));
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
    const matches = expr.match(REFS_RE);
    if (!matches) return;

    matches.forEach(capture => {
      const propName = getPropName(capture);
      if (this[propName] === undefined) {
        this.#throwInvalidRef(element, attrName, propName);
      }
    });

    return matches;
  }

  // When type is an array, this can't validate the type of the array elements.
  #validateType(propName: string, type: AnyClass, value: any) {
    if (value instanceof type) return;

    let t = typeof value as string;
    if (t === 'object') {
      const {constructor} = value;
      t = constructor.name;
      if (constructor !== type) {
        this.#throw(
          null,
          propName,
          `was set to a ${t}, but must be a ${type.name}`
        );
      }
    }

    // Handle primitive types.
    if (t !== type.name.toLowerCase()) {
      this.#throw(
        null,
        propName,
        `was set to a ${t}, but must be a ${type.name}`
      );
    }
  }

  #wireEvents(root: ShadowRoot | HTMLElement) {
    const elements = Array.from(root.querySelectorAll('*')) as HTMLElement[];
    for (const element of elements) {
      // We don't want to remove attributes while we are iterating over them.
      const attributesToRemove = [];

      for (const attr of Array.from(element.attributes)) {
        const attrName = attr.name;
        if (attrName.startsWith('on')) {
          let eventName = attrName.slice(2);
          eventName =
            eventName[0].toLowerCase() + eventName.slice(1).toLowerCase();
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

export function css(strings: TemplateStringsArray, ...values: unknown[]) {
  let result = interpolate(strings, values);

  // Replace JavaScript expressions in CSS property values
  // with a reference to a CSS variable whose value is the expression.
  while (true) {
    const match = CSS_PROPERTY_RE.exec(result);
    if (!match) break;

    const propValue = match[2];
    if (REFS_TEST_RE.test(propValue)) {
      const propName = match[1];
      if (!propName.startsWith('--')) {
        const replacement = `--${propName}: ${propValue};
        ${propName}: var(--${propName});`;
        result = replace(result, match.index, match[0].length, replacement);
      }
    }
  }

  return result;
}

export function html(strings: TemplateStringsArray, ...values: unknown[]) {
  let result = interpolate(strings, values);

  // Replace JavaScript expressions in HTML element text content
  // with an HTML comment containing the expression.
  while (true) {
    const match = HTML_ELEMENT_TEXT_RE.exec(result);
    if (!match) break;
    const textContent = removeHtmlComments(match[2]);
    if (REFS_TEST_RE.test(textContent)) {
      const comment = `<!-- ${textContent.trim()} -->`;
      const index = match.index + match[0].indexOf('>') + 1;
      result = replace(result, index, textContent.length, comment);
    }
  }

  return result;
}
