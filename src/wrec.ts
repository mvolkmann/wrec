import type {ChangeListener, WrecState} from './wrec-state';
import {getPathValue, setPathValue} from './paths.js';

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
// Don't add 'disabled', 'id', or 'name' here!
const RESERVED_ATTRS = new Set(['class', 'style']);
const SKIP = 'this.'.length;

function canDisable(element: Element) {
  return (
    element instanceof HTMLButtonElement ||
    element instanceof HTMLFieldSetElement ||
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof Wrec
  );
}

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

// This returns an array of all descendant elements of a given element,
// including those in nested shadow DOMs.
function getAllDescendants(root: Element | ShadowRoot): Element[] {
  const elements = [];
  let element = root.firstElementChild;
  while (element) {
    elements.push(element);
    if (element.shadowRoot) {
      elements.push(...getAllDescendants(element.shadowRoot));
    }
    // Process light DOM grandchildren.
    if (element.firstElementChild) {
      elements.push(...getAllDescendants(element));
    }
    element = element.nextElementSibling;
  }
  return elements;
}

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

function isTextArea(element: Element) {
  return element.localName === 'textarea';
}

function isValueElement(element: Element) {
  const {localName} = element;
  return localName === 'input' || localName === 'select';
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
  if (isNaN(n)) throw new WrecError(`can't convert "${str}" to a number`);
  return n;
}

function updateAttribute(
  element: HTMLElement,
  attrName: string,
  value: string | number | boolean
) {
  const [realAttrName, _eventName] = attrName.split(':');

  // Attributes can only be set to primitive values.
  if (isPrimitive(value)) {
    if (typeof value === 'boolean') {
      if (value) {
        element.setAttribute(realAttrName, realAttrName);
      } else {
        element.removeAttribute(realAttrName);
      }

      // Set the corresponding property.
      // This is essential for the "disabled" attribute and
      // possibly others like "checked".
      const propName = Wrec.getPropName(realAttrName);
      (element as Record<string, any>)[propName] = value;
    } else {
      // Set the attribute.
      const currentValue = element.getAttribute(attrName);
      const newValue = String(value);
      if (currentValue !== newValue) {
        element.setAttribute(realAttrName, newValue);
        if (realAttrName === 'value' && isValueElement(element)) {
          (element as HTMLValueElement).value = newValue;
        }
      }
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
  const [realAttrName, _eventName] = attrName.split(':');

  if (element instanceof CSSRule) {
    element.style.setProperty(realAttrName, value); // CSS variable
  } else {
    updateAttribute(element, realAttrName, value);
    if (realAttrName === 'value' && isValueElement(element)) {
      (element as HTMLValueElement).value = value;
    }
  }
}

export class Wrec extends HTMLElement implements ChangeListener {
  // This is used to lookup the camelCase property name
  // that corresponds to a kebab-case attribute name.
  static #attrToPropMap = new Map<string, string>();

  // This is used to lookup the kebab-case attribute name
  // that corresponds to a camelCase property name.
  static #propToAttrMap = new Map<string, string>();

  // This can be set in each Wrec subclass.
  // It describes CSS rules that a web component uses.
  static css = '';

  // Set this to true in Wrec subclasses that need
  // the ability to contribute data to form submissions.
  static formAssociated = false;

  // This must be set in each Wrec subclass.
  // It describes HTML that a web component renders.
  static html = '';

  // There is one instance of `properties`, `propToComputedMap`,
  // and `propToExprsMap` per Wrec subclass,
  // not one for only the Wrec class.

  // This must be set in each Wrec subclass.
  // It describes all the properties that a web component supports.
  static properties: Record<string, any> = {};

  // This is a map from properties to arrays of
  // computed property expressions that use the property.
  // It is used to update computed properties
  // when the properties on which they depend are modified.
  // See the method #updateComputedProperties.
  // This map cannot be private.
  static propToComputedMap: Map<string, string[][]> | null = null;

  // This is a map from properties to expressions that refer to them.
  // It is the sma for all instances of a component.
  // This map cannot be private.
  static propToExprsMap: Map<string, string[]> | null = null;

  static template: HTMLTemplateElement | null = null;

  #ctor: typeof Wrec = this.constructor as typeof Wrec;

  // This is a map from expressions to references to them
  // which can be found in element text content,
  // attribute values, and CSS property values.
  // Each component instance needs its own map.
  #exprToRefsMap = new Map<string, Ref[]>();

  #formAssoc: Record<string, string> = {};
  #formData: FormData | undefined;

  // For components that set `formAssociated` to true,
  // this stores in the initial value of each property
  // in the formAssociatedCallback method
  // so they can be restored in the formResetCallback method.
  #initialValuesMap: Record<string, any> = {};

  #internals: ElementInternals | null = null;

  // This must be an instance property and cannot be private because
  // child components need to access the property in their parent component.
  #propToParentPropMap = new Map<string, string>();

  // This tells TypeScript that it's okay to access properties by string keys.
  [key: string]: any;

  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    // Create one instance of `properties`, `propToComputedMap`,
    // and `propToExprsMap` for each Wrec subclass.
    const ctor = this.#ctor;
    if (!ctor.properties) ctor.properties = {};
    if (!ctor.propToComputedMap) ctor.propToComputedMap = new Map();
    if (!ctor.propToExprsMap) ctor.propToExprsMap = new Map();
  }

  attributeChangedCallback(
    attrName: string,
    oldValue: string,
    newValue: string | number | boolean | undefined
  ) {
    if (attrName === 'disabled') this.#disableOrEnable();

    const propName = Wrec.getPropName(attrName);
    if (this.#hasProperty(propName)) {
      // Update the corresponding property.
      const value = this.#typedValue(propName, String(newValue));
      this[propName] = value;
      const formKey = this.#formAssoc[propName];
      if (formKey) this.setFormValue(formKey, String(value));
      this.propertyChangedCallback(propName, oldValue, newValue);
    }
  }

  #buildDOM() {
    const ctor = this.#ctor;
    let template = ctor.template;
    if (!template) {
      template = ctor.template = document.createElement('template');
      // Include a CSS rule that respects the "hidden" attribute.
      // This is a web.dev custom element best practice.
      let text = '<style> :host([hidden]) { display: none; } ';
      if (ctor.css) text += ctor.css;
      text += '</style>';
      text += ctor.html;
      template.innerHTML = text;
    }
    this.shadowRoot?.replaceChildren(template.content.cloneNode(true));
  }

  changed(statePath: string, componentProp: string, newValue: unknown) {
    this[componentProp] = newValue;
  }

  connectedCallback() {
    this.#validateAttributes();
    this.#defineProps();
    this.#buildDOM();

    if (this.hasAttribute('disabled')) this.#disableOrEnable();

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      if (this.shadowRoot) {
        this.#wireEvents(this.shadowRoot);
        this.#makeReactive(this.shadowRoot);
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
    const has = this.hasAttribute(attrName);
    if (config.required && !has) {
      this.#throw(this, propName, 'is a required attribute');
    }

    // This follows the best practice
    // "Consider checking for properties that may
    // have been set before the element upgraded."
    let value = config.value;
    if (this.hasOwnProperty(propName)) {
      value = this[propName];
      delete this[propName];
    }

    // Copy the property value to a private property.
    // The property is replaced below with Object.defineProperty.
    const {type} = config;
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
        if (stateProp) setPathValue(state, stateProp, value);

        this.#updateComputedProperties(propName);
        this.#updateAttribute(propName, type, value, attrName);
        this.#react(propName);
        this.#updateParentProperty(propName, value);
        const formKey = this.#formAssoc[propName];
        if (formKey) this.setFormValue(formKey, String(value));
        this.propertyChangedCallback(propName, oldValue, value);
        if (config.dispatch) this.dispatch('change', {[propName]: value});
      }
    });
  }

  #disableOrEnable() {
    // Update all descendant form control elements.
    const isDisabled = this.hasAttribute('disabled');
    const elements = getAllDescendants(this.shadowRoot!);
    for (const element of elements) {
      if (canDisable(element)) element.disabled = isDisabled;
    }
  }

  disconnectedCallback() {
    //TODO: Should more cleanup be performed here?
    this.#exprToRefsMap.clear();
    this.#propToParentPropMap.clear();
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
            /* WARNING:
             * `style` elements in the static html value should be avoided.
             * In `style` elements that appear in the static html value,
             * property references like `this.value` are not supported.
             * They are only supported in the static css value.
             * The following does work inside `style` elements:
             * .someClass {
             *   --color: this.value;
             *   color: var(--color);
             * }
             */
            if (prop.startsWith('--')) {
              const value = rule.style.getPropertyValue(prop);
              this.#registerPlaceholders(value, rule, prop);
            }
          }
        }
      }
    } else {
      let commentText = '';

      if (isTextArea(element)) {
        this.#registerPlaceholders(element.textContent, element);

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
        if (propName && isTextArea(element)) {
          element.textContent = this[propName];
        } else {
          this.#registerPlaceholders(commentText, element);
        }
      }
    }
  }

  // This method is called automatically if
  // the component is nested in form element AND
  // the static property formAssociated is true.
  // It does things that are only necessary in that situation.
  formAssociatedCallback() {
    let fa = this.getAttribute('form-assoc');

    // If the form-assoc attribute is not set,
    // but the name attribute is set AND there is a value property,
    // use those for form association.
    // This matches the behavior for built-in form control elements like input.
    if (!fa) {
      const name = this.getAttribute('name');
      if (name) {
        if (this.#hasProperty('value')) {
          fa = `value:${name}`;
        } else {
          //TODO: Should this be considered an error?
          //throw new WrecError(
          //  `can't submit by name because component has no value property`
          //);
          return; // nothing to submit
        }
      } else {
        return; // nothing to submit
      }
    }

    // Build mapping from component property names to form field names.
    const formAssoc: Record<string, string> = {};
    const pairs = fa.split(',');
    for (const pair of pairs) {
      const [key, value] = pair.split(':');
      formAssoc[key.trim()] = value.trim();
    }
    this.#formAssoc = formAssoc;

    // Prepare for form submissions.
    this.#formData = new FormData();
    this.#internals = this.attachInternals();
    this.#internals.setFormValue(this.#formData);

    // Build mapping from property names to their initial values
    // so the containing form can be reset.
    const propNames = Object.keys(this.#ctor.properties);
    const map = this.#initialValuesMap;
    for (const propName of propNames) {
      map[propName] = this[propName];
    }
  }

  formResetCallback() {
    const map = this.#initialValuesMap;
    for (const propName of Object.keys(map)) {
      let value = map[propName];
      if (REF_RE.test(value)) value = this.#evaluateInContext(value);
      this[propName] = value;
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

  #handleEvents(
    element: HTMLElement,
    attrName: string | undefined,
    matches: string[]
  ) {
    if (matches.length !== 1) return;
    const [match] = matches;
    if (!REF_RE.test(match)) return;

    const isFormControl = isValueElement(element) || isTextArea(element);
    let [realAttrName, eventName] = (attrName ?? '').split(':');
    const shouldListen =
      (isFormControl && realAttrName === 'value') || isTextArea(element);
    if (!shouldListen) return;

    if (eventName) {
      if ((element as any)['on' + eventName] === undefined) {
        const msg = 'refers to an unsupported event name';
        this.#throw(element, attrName, msg);
      }
    } else {
      eventName = 'change';
    }

    const propName = getPropName(match);
    element.addEventListener(eventName, (event: Event) => {
      const {target} = event;
      if (!target) return;
      const value = (target as HTMLValueElement).value;
      const {type} = this.#ctor.properties[propName];
      this[propName] = type === Number ? stringToNumber(value) : value;
      this.#react(propName);
    });
  }

  #hasProperty(propName: string) {
    return Boolean(this.#ctor.properties[propName]);
  }

  #makeReactive(root: ShadowRoot | HTMLElement) {
    const elements = Array.from(root.querySelectorAll('*')) as HTMLElement[];
    for (const element of elements) {
      this.#evaluateAttributes(element);

      // If the element has no child elements, evaluate its text content.
      if (!element.firstElementChild) this.#evaluateText(element);
    }
    /* These lines are useful for debugging.
    if (this.constructor.name === 'ColorPicker') {
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
    const keys = Object.keys(this.properties || {}).map(Wrec.getAttrName);
    if (!keys.includes('disabled')) keys.push('disabled');
    return keys;
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
      let value = this.#evaluateInContext(expr);
      const refs: Ref[] = this.#exprToRefsMap.get(expr) ?? [];
      for (const ref of refs) {
        if (ref instanceof HTMLElement) {
          this.#updateElementContent(ref, value);
        } else if (ref instanceof CSSStyleRule) {
          // We need to handle this case for completeness,
          // but a ref is never just a CSSStyleRule.
          // It can be an object with element and attrName properties
          // where the element is a CSSStyleRule.
          // The call to the #registerPlaceholders method
          // in the #evaluateText method creates those.
          // That case is is handled by the else block below.
        } else {
          const {element, attrName} = ref;
          if (element instanceof CSSStyleRule) {
            element.style.setProperty(attrName, value);
          } else {
            updateValue(element, attrName, value);
          }
        }
      }
    }
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

    if (element instanceof HTMLElement) {
      this.#handleEvents(element, attrName, matches);
    }

    const value = this.#evaluateInContext(text);
    if (attrName) {
      updateValue(element, attrName, value);
    } else {
      this.#updateElementContent(element, value);
    }
  }

  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(name: string, value: string) {
    if (!this.hasAttribute(name)) this.setAttribute(name, value);
  }

  setFormValue(propName: string, value: string) {
    if (!this.#formData || !isPrimitive(value)) return;
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
  // VS Code thinks this is never called, but it is called by #defineProp.
  #updateAttribute(propName: string, type: any, value: any, attrName: string) {
    if (isPrimitive(value) && this.hasAttribute(attrName)) {
      const oldValue =
        type === Boolean
          ? this.hasAttribute(attrName)
          : this.#typedAttribute(propName, attrName);
      if (value !== oldValue) updateAttribute(this, propName, value);
    }
  }

  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
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
    const t = typeof value;
    if (t !== 'string' && t !== 'number') {
      this.#throw(
        element,
        undefined,
        ` computed content is not a string or number`
      );
    }

    if (element instanceof HTMLElement && isTextArea(element)) {
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
  // VS Code thinks this is never called, but it is called by #defineProp.
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
   * @param state - WrecState object
   * @param map - object whose keys are state properties and
   *   whose values are component properties
   */
  useState(state: WrecState, map?: Record<string, string>) {
    if (!map) {
      // Assume this component has the same properties as the state.
      map = {};
      for (const prop of Object.keys(state)) {
        map[prop] = prop;
      }
    }

    this.#validateStateMap(state, map);

    for (const [stateProp, componentProp] of Object.entries(map)) {
      if (this.#hasProperty(componentProp)) {
        const value = getPathValue(state, stateProp);
        if (value !== undefined) this[componentProp] = value;
        const config = this.#ctor.properties[componentProp];
        config.state = state;
        config.stateProp = stateProp;
      }
    }
    state.addListener(this, map);
  }

  #validateAttributes() {
    const ctor = this.#ctor;
    const propNames = new Set(Object.keys(ctor.properties));
    for (const propName of propNames) {
      if (RESERVED_ATTRS.has(propName)) {
        this.#throw(
          null,
          '',
          `property "${propName}" is not allowed because it is a reserved attribute`
        );
      }
    }

    const className = this.#ctor.name;

    for (const attrName of this.getAttributeNames()) {
      if (attrName === 'class') continue;
      if (attrName === 'id') continue;
      if (attrName === 'disabled') continue;
      if (attrName.startsWith('on')) continue;
      if (attrName === 'form-assoc') {
        if (!ctor.formAssociated) {
          throw new WrecError(
            `add "static formAssociated = true;" to class ${className}`
          );
        }
        continue;
      }
      if (!propNames.has(Wrec.getPropName(attrName))) {
        if (attrName === 'name') {
          if (ctor.formAssociated) continue;
          throw new WrecError(
            `name attribute requires "static formAssociated = true;" in class ${className}`
          );
        }
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

  #validateStateMap(state: WrecState, map: Record<string, string>) {
    for (const [statePath, componentProp] of Object.entries(map)) {
      let value = getPathValue(state, statePath);
      if (value === undefined) {
        throw new WrecError(`invalid state path "${statePath}"`);
      }

      value = this[componentProp];
      if (!this.#hasProperty(componentProp)) {
        this.#throw(
          null,
          componentProp,
          'refers to missing property in useState map'
        );
      }
    }
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
    // Don't do this in style elements.
    if (!match || match[1] === 'style') break;
    const textContent = removeHtmlComments(match[2]);
    if (REFS_TEST_RE.test(textContent)) {
      const comment = `<!-- ${textContent.trim()} -->`;
      const index = match.index + match[0].indexOf('>') + 1;
      result = replace(result, index, textContent.length, comment);
    }
  }

  return result;
}
