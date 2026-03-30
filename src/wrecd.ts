// This requires "compilerOptions" in tsconfig.json to have
// "useDefineForClassFields": false
import type {ChangeListener} from './wrec-state';
import {WrecState} from './wrec-state';
import {getPathValue, setPathValue} from './paths';
import sanitize from './sanitize-xss';

// When this package is bundled by Vite,
// the bundle exports everything exported by this file.
export type {ChangeListener};
export {WrecState};

type HTMLValueElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
type Ref =
  | HTMLElement
  | CSSStyleRule
  | {element: HTMLElement | CSSStyleRule; attrName: string};
type StateBinding = {state: WrecState; stateProp: string};
type StringToAny = Record<string, any>;
type StringToString = Record<string, string>;

export type PropertyConfigD = {
  attrName?: string;
  computed?: string;
  dispatch?: boolean;
  doc?: string;
  required?: boolean;
  type?: AnyClass;
  usedBy?: string | string[];
  values?: string[];
};

type PropertyDecoratorOptions = Omit<PropertyConfigD, 'computed'>;
type ComputedDecoratorOptions = Omit<PropertyConfigD, 'computed'>;

const globalAttributes = new Set([
  'class',
  'disabled',
  'hidden',
  'id',
  'tabindex',
  'title'
]);

const HTMLElementBase =
  globalThis.HTMLElement ?? (class {} as typeof HTMLElement);
const customElementsApi: CustomElementRegistry =
  globalThis.customElements ??
  ({
    get: (_name: string) => undefined,
    getName: () => '',
    define: () => {},
    upgrade: () => {},
    whenDefined: () =>
      Promise.reject(
        new Error('customElements is not available in this environment')
      )
  } as CustomElementRegistry);

type AnyClass = new (...args: any[]) => any;

const propertyConfigs = new WeakMap<
  typeof WrecD,
  Record<string, PropertyConfigD>
>();

class WrecDError extends Error {}

const CSS_PROPERTY_RE = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g;
const FIRST_CHAR = 'a-zA-Z_$';
const OTHER_CHAR = FIRST_CHAR + '0-9';
const IDENTIFIER = `[${FIRST_CHAR}][${OTHER_CHAR}]*`;
const CALL_RE = new RegExp(`this\\.(${IDENTIFIER})\\s*\\(`, 'g');
const HTML_COMMENT_TEXT_RE = /<!--\s*(.*?)\s*-->/;
const HTML_ELEMENT_TEXT_RE = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g;
const REF_RE = new RegExp(`^this\\.${IDENTIFIER}$`);
const REFS_RE = new RegExp(`this\\.${IDENTIFIER}(\\.${IDENTIFIER})*`, 'g');
const REFS_TEST_RE = new RegExp(`this\\.${IDENTIFIER}(\\.${IDENTIFIER})*`);
const SKIP = 'this.'.length;

function canDisable(element: Element) {
  return (
    element instanceof HTMLButtonElement ||
    element instanceof HTMLFieldSetElement ||
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof WrecD
  );
}

export function createElement(
  name: string,
  attributes: StringToString,
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

const defaultForConfig = (config: PropertyConfigD) =>
  Array.isArray(config.values) && config.values.length > 0
    ? config.values[0]
    : defaultForType(config.type);

const defaultForType = (type?: AnyClass) =>
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

function getAllDescendants(
  root: DocumentFragment | Element | ShadowRoot
): Element[] {
  const elements = [];
  let element = root.firstElementChild;
  while (element) {
    elements.push(element);
    if (element.shadowRoot) {
      elements.push(...getAllDescendants(element.shadowRoot));
    }
    if (element.firstElementChild) {
      elements.push(...getAllDescendants(element));
    }
    element = element.nextElementSibling;
  }
  return elements;
}

const getPropName = (str: string) => str.substring(SKIP).split('.')[0];

function inferType(value: unknown): AnyClass | undefined {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) return Array;
  const t = typeof value;
  if (t === 'string') return String;
  if (t === 'number') return Number;
  if (t === 'boolean') return Boolean;
  if (t === 'object') return Object;
}

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
  if (isNaN(n)) throw new WrecDError(`can't convert "${str}" to a number`);
  return n;
}

function updateAttribute(
  element: HTMLElement,
  attrName: string,
  value: string | number | boolean
) {
  const [realAttrName] = attrName.split(':');

  if (isPrimitive(value)) {
    if (typeof value === 'boolean') {
      if (value) {
        element.setAttribute(realAttrName, realAttrName);
      } else {
        element.removeAttribute(realAttrName);
      }

      const propName = WrecD.getPropName(realAttrName);
      (element as StringToAny)[propName] = value;
    } else {
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
    const propName = WrecD.getPropName(attrName);
    (element as StringToAny)[propName] = value;
  }
}

function updateValue(
  element: HTMLElement | CSSStyleRule,
  attrName: string,
  value: string
) {
  const [realAttrName] = attrName.split(':');

  if (element instanceof CSSStyleRule) {
    element.style.setProperty(realAttrName, value);
  } else {
    updateAttribute(element, realAttrName, value);
    if (realAttrName === 'value' && isValueElement(element)) {
      (element as HTMLValueElement).value = value;
    }
  }
}

const usedByArray = (usedBy?: string | string[]) =>
  typeof usedBy === 'string' ? [usedBy] : usedBy;

async function waitForDefines(
  template: HTMLTemplateElement
): Promise<unknown[]> {
  const customSet = new Set<string>();
  for (const element of getAllDescendants(template.content)) {
    const {localName} = element;
    if (localName.includes('-')) customSet.add(localName);
  }

  function getTimeout(tagName: string) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`custom element <${tagName}> not defined`));
      }, 1000);
    });
  }

  return Promise.all(
    [...customSet].map(async tagName =>
      Promise.race([
        customElementsApi.whenDefined(tagName),
        getTimeout(tagName)
      ])
    )
  );
}

function getBasePropertyConfigs(
  ctor: typeof WrecD
): Record<string, PropertyConfigD> {
  let configs = propertyConfigs.get(ctor);
  if (!configs) {
    const parent = Object.getPrototypeOf(ctor);
    const inherited =
      parent && parent.prototype instanceof WrecD
        ? getBasePropertyConfigs(parent)
        : {};
    configs = {...inherited};
    propertyConfigs.set(ctor, configs);
  }
  return configs;
}

function decorateField<Value>(
  update: (config: PropertyConfigD, initialValue: Value) => void
) {
  return function <This extends object>(
    _value: undefined,
    context: ClassFieldDecoratorContext<This, Value>
  ) {
    if (context.static || context.private || typeof context.name !== 'string') {
      throw new WrecDError(
        'WrecD decorators can only be used on public instance fields'
      );
    }
    const propName = context.name;

    return function (this: This, initialValue: Value): Value {
      const ctor = this.constructor as typeof WrecD;
      const configs = getBasePropertyConfigs(ctor);
      const config = configs[propName] ?? (configs[propName] = {});
      update(config, initialValue);
      if (!config.type) config.type = inferType(initialValue);
      return initialValue;
    };
  };
}

export function property<Value = unknown>(
  options: PropertyDecoratorOptions = {}
) {
  return decorateField<Value>((config, _initialValue) => {
    Object.assign(config, options);
  });
}

export function required<Value>(
  _value: undefined,
  context: ClassFieldDecoratorContext<object, Value>
) {
  return decorateField<Value>(config => {
    config.required = true;
  })(undefined, context);
}

export function dispatch<Value>(
  _value: undefined,
  context: ClassFieldDecoratorContext<object, Value>
) {
  return decorateField<Value>(config => {
    config.dispatch = true;
  })(undefined, context);
}

export function usedBy<Value>(methods: string | string[]) {
  return decorateField<Value>(config => {
    config.usedBy = methods;
  });
}

export function doc<Value>(text: string) {
  return decorateField<Value>(config => {
    config.doc = text;
  });
}

export function computed<Value>(
  expression: string,
  options: ComputedDecoratorOptions = {}
) {
  return decorateField<Value>((config, _initialValue) => {
    Object.assign(config, options, {computed: expression});
  });
}

export abstract class WrecD extends HTMLElementBase implements ChangeListener {
  private static attrToPropMap = new Map<string, string>();
  private static propToAttrMap = new Map<string, string>();

  static context = {};
  static css = '';
  private static elementName = '';
  static formAssociated = false;
  static html = '';
  private static propToComputedMap: Map<string, string[][]>;
  private static methodToExprsMap: Map<string, string[]> | undefined;
  private static propToExprsMap: Map<string, string[]>;
  private static template: HTMLTemplateElement | null = null;

  static get properties() {
    return getBasePropertyConfigs(this as typeof WrecD);
  }

  #batching = false;
  #computedUpdates = new Set<string>();
  #ctor: typeof WrecD = this.constructor as typeof WrecD;
  #exprToRefsMap = new Map<string, Ref[]>();
  #formAssoc: StringToString = {};
  #formData: FormData | undefined;
  #initialValuesMap: StringToAny = {};
  #internals: ElementInternals | null = null;
  #propToParentPropMap = new Map<string, string>();
  #propToStateMap = new Map<string, StateBinding>();
  #syncingAttribute = false;

  static define(elementName: string) {
    this.elementName = elementName;
    if (customElementsApi.get(elementName)) {
      throw new WrecDError(`custom element ${elementName} is already defined`);
    } else {
      customElementsApi.define(elementName, this as any);
    }
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const ctor = this.#ctor;
    if (!this.#hasOwn('attrToPropMap')) ctor.attrToPropMap = new Map();
    if (!this.#hasOwn('propToAttrMap')) ctor.propToAttrMap = new Map();
    if (!this.#hasOwn('propToComputedMap')) ctor.propToComputedMap = new Map();
    if (!this.#hasOwn('propToExprsMap')) ctor.propToExprsMap = new Map();
  }

  setAttribute(name: string, value: string): void {
    const oldValue = super.getAttribute(name);
    super.setAttribute(name, value);
    if (!this.#syncingAttribute)
      this.#attributeDidChange(name, oldValue, value);
  }

  removeAttribute(name: string): void {
    const oldValue = super.getAttribute(name);
    super.removeAttribute(name);
    if (!this.#syncingAttribute) this.#attributeDidChange(name, oldValue, null);
  }

  #attributeDidChange(
    attrName: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (attrName === 'disabled') this.#disableOrEnable();

    const propName = this.#propNameFromAttribute(attrName);
    if (!propName || this.#isComputedProp(propName)) return;
    if (!this.#hasProperty(propName)) return;

    const value = this.#typedValue(propName, newValue);
    (this as StringToAny)[propName] = value;
    const formKey = this.#formAssoc[propName];
    if (formKey) this.setFormValue(formKey, String(value));
    this.propertyChangedCallback(propName, oldValue, newValue);
  }

  batchSet(changes: StringToAny) {
    this.#batching = true;

    const propToExprsMap = this.#ctor.propToExprsMap;
    const exprSet = new Set<string>();
    for (const [propName, value] of Object.entries(changes)) {
      (this as StringToAny)[propName] = value;
      const exprs = propToExprsMap.get(propName) ?? [];
      for (const expr of exprs) exprSet.add(expr);
    }

    const propToComputedMap = this.#ctor.propToComputedMap;
    const computedSet = new Set<string>();
    const computedToExprMap: StringToString = {};
    for (const propName of Object.keys(changes)) {
      const computes = propToComputedMap.get(propName) || [];
      for (const [computedName, expr] of computes) {
        computedSet.add(computedName);
        computedToExprMap[computedName] = expr;
      }
    }

    for (const computedName of computedSet) {
      const expr = computedToExprMap[computedName];
      this.#setComputed(computedName, this.#evaluateInContext(expr));
      const exprs = propToExprsMap.get(computedName) ?? [];
      for (const expr of exprs) exprSet.add(expr);
    }

    while (true) {
      let changed = false;
      for (const computedName of computedSet) {
        const expr = computedToExprMap[computedName];
        const newValue = this.#evaluateInContext(expr);
        const oldValue = (this as StringToAny)[computedName];
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.#setComputed(computedName, newValue);
          changed = true;
        }
      }
      if (!changed) break;
    }

    this.#evaluateExpressions([...exprSet]);
    this.#batching = false;
  }

  async #buildDOM() {
    const ctor = this.#ctor;
    let {template} = ctor;
    if (!template) {
      template = ctor.template = document.createElement('template');
      template.innerHTML = ctor.buildHTML();
    }
    await waitForDefines(template);
    this.shadowRoot!.replaceChildren(template.content.cloneNode(true));
  }

  private static buildHTML() {
    let style = `<style>\n    :host([hidden]) { display: none; }`;
    if (this.css) style += this.css;
    style += '</style>\n';

    let html = this.html.trim();
    if (!html) throw new WrecDError('static property html must be set');
    if (!html.startsWith('<')) html = `<span><!--${html}--></span>`;
    return style + html;
  }

  changed(_statePath: string, componentProp: string, newValue: unknown) {
    (this as StringToAny)[componentProp] = newValue;
  }

  async connectedCallback() {
    this.#validateAttributes();
    this.#defineProps();
    await this.#buildDOM();
    if (this.hasAttribute('disabled')) this.#disableOrEnable();
    this.#wireEvents(this.shadowRoot!);
    this.#makeReactive(this.shadowRoot!);
    this.#usedBy();
    this.#computeProps();
  }

  #computeProps() {
    const {properties} = this.#ctor;
    for (const [propName, {computed}] of Object.entries(properties)) {
      if (computed) {
        this.#setComputed(propName, this.#evaluateInContext(computed));
      }
    }
  }

  #defineProps() {
    const {properties} = this.#ctor;

    for (const [propName, config] of Object.entries(properties)) {
      if (config.computed) continue;
      this.#defineProp(propName, config);
    }

    for (const [propName, config] of Object.entries(properties)) {
      if (!config.computed) continue;
      this.#defineProp(propName, config);
    }
  }

  #defineProp(propName: string, config: PropertyConfigD) {
    if (propName === 'class' || propName === 'style') {
      throw new WrecDError(`"${propName}" is a reserved property`);
    }

    const attrName = this.#attributeName(propName, config);
    const has = this.hasAttribute(attrName);
    if (
      config.required &&
      !has &&
      !Object.prototype.hasOwnProperty.call(this, propName)
    ) {
      this.#throw(this, attrName, 'is a required attribute');
    }

    let value: unknown;
    if (Object.prototype.hasOwnProperty.call(this, propName)) {
      value = (this as StringToAny)[propName];
      delete (this as StringToAny)[propName];
    }

    const type = config.type;
    const typedValue =
      type === Boolean
        ? value || has
        : has
          ? this.#typedAttribute(propName, attrName)
          : (value ?? defaultForConfig(config));
    const privateName = '#' + propName;
    (this as StringToAny)[privateName] = typedValue;

    if (config.computed) this.#registerComputedProp(propName, config);

    Object.defineProperty(this, propName, {
      enumerable: true,
      get() {
        return (this as StringToAny)[privateName];
      },
      set(value) {
        if (config.computed && !this.#computedUpdates.has(propName)) {
          this.#throw(
            null,
            propName,
            'is a computed property and cannot be set directly'
          );
        }

        if (type === Number && typeof value === 'string') {
          value = stringToNumber(value);
        }

        const oldValue = (this as StringToAny)[privateName];
        if (value === oldValue) return;

        if (!type) {
          this.#throw(null, propName, 'does not specify its type');
        }
        this.#validateType(propName, type, value);

        (this as StringToAny)[privateName] = value;
        const stateBinding = this.#propToStateMap.get(propName);
        if (stateBinding) {
          setPathValue(stateBinding.state, stateBinding.stateProp, value);
        }

        this.#updateAttribute(propName, type, value, attrName);
        if (!this.#batching) {
          this.#updateComputedProperties(propName);
          this.#react(propName);
        }
        this.#updateParentProperty(propName, value);
        const formKey = this.#formAssoc[propName];
        if (formKey) this.setFormValue(formKey, String(value));
        this.propertyChangedCallback(propName, oldValue, value);
        if (config.dispatch) {
          this.dispatch('change', {
            tagName: this.localName,
            property: propName,
            oldValue,
            value
          });
        }
      }
    });
  }

  #disableOrEnable() {
    const isDisabled = this.hasAttribute('disabled');
    const elements = getAllDescendants(this.shadowRoot!);
    for (const element of elements) {
      if (canDisable(element)) (element as StringToAny).disabled = isDisabled;
    }
  }

  disconnectedCallback() {
    for (const {state} of this.#propToStateMap.values()) {
      state.removeListener(this);
    }

    this.#exprToRefsMap.clear();
    this.#initialValuesMap.clear();
    this.#propToParentPropMap.clear();
    this.#propToStateMap.clear();
  }

  dispatch(name: string, detail: any) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail
      })
    );
  }

  displayIfSet(value: any, display = 'block') {
    return `display: ${value ? display : 'none'}`;
  }

  #evaluateAttributes(element: HTMLElement) {
    const isWC = element instanceof WrecD;

    for (const attrName of element.getAttributeNames()) {
      const text = element.getAttribute(attrName);
      const propName = this.#propRefName(element, text);
      if (propName) {
        const value = (this as StringToAny)[propName];
        if (value === undefined) {
          this.#throwInvalidRef(element, attrName, propName);
        }

        let [realAttrName, eventName] = attrName.split(':');
        const childPropName = WrecD.getPropName(realAttrName);
        const parentComputed = this.#isComputedProp(propName);
        const childComputed = isWC
          ? (element as WrecD).#isComputedProp(childPropName)
          : false;
        if (!childComputed) {
          (element as StringToAny)[childPropName] = value;
        }

        if (realAttrName === 'value') {
          if (eventName) {
            if ((element as any)['on' + eventName] === undefined) {
              this.#throw(
                element,
                attrName,
                'refers to an unsupported event name'
              );
            }
            element.setAttribute(
              realAttrName,
              String((this as StringToAny)[propName])
            );
          } else {
            eventName = 'change';
          }
        }

        if (isWC && !parentComputed) {
          (element as WrecD).#propToParentPropMap.set(
            WrecD.getPropName(realAttrName),
            propName
          );
        }
      }

      this.#registerPlaceholders(text, element, attrName);
    }
  }

  #evaluateExpressions(exprs: string[]) {
    for (const expr of exprs) {
      const value = this.#evaluateInContext(expr);
      const refs: Ref[] = this.#exprToRefsMap.get(expr) ?? [];
      const disconnectedRefs = new Set<Ref>();

      for (const ref of refs) {
        const element =
          ref instanceof HTMLElement || ref instanceof CSSStyleRule
            ? ref
            : ref.element;
        if (element instanceof HTMLElement && !element.isConnected) {
          disconnectedRefs.add(ref);
          continue;
        }

        if (ref instanceof HTMLElement) {
          this.#updateElementContent(ref, value);
        } else if (!(ref instanceof CSSStyleRule)) {
          const {element, attrName} = ref;
          if (element instanceof CSSStyleRule) {
            element.style.setProperty(attrName, String(value));
          } else {
            updateValue(element, attrName, String(value));
          }
        }
      }

      if (disconnectedRefs.size > 0) {
        const newRefs = refs.filter(ref => !disconnectedRefs.has(ref));
        if (newRefs.length === 0) {
          this.#exprToRefsMap.delete(expr);
        } else {
          this.#exprToRefsMap.set(expr, newRefs);
        }
      }
    }
  }

  #evaluateInContext(expression: string) {
    const {context} = this.#ctor;
    const keys = Object.keys(context);
    const fn = new Function(
      'context',
      `const {${keys.join(',')}} = context; return ${expression};`
    );
    return fn.call(this, context);
  }

  #evaluateText(element: HTMLElement) {
    const {localName} = element;

    if (localName === 'style') {
      const {sheet} = element as HTMLStyleElement;
      const rules = sheet?.cssRules ?? [];
      const ruleArray = Array.from(rules) as CSSStyleRule[];
      for (const rule of ruleArray) {
        if (rule.constructor === CSSStyleRule) {
          const props = Array.from(rule.style);
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

      if (isTextArea(element)) {
        this.#registerPlaceholders(element.textContent, element);
        const match = element.textContent?.match(HTML_COMMENT_TEXT_RE);
        if (match) commentText = match[1];
      } else {
        const comment = Array.from(element.childNodes).find(
          node => node.nodeType === Node.COMMENT_NODE
        );
        if (comment) commentText = comment.textContent?.trim() ?? '';
      }

      if (commentText) {
        const propName = this.#propRefName(element, commentText);
        if (propName && isTextArea(element)) {
          element.textContent = String((this as StringToAny)[propName]);
        } else {
          this.#registerPlaceholders(commentText, element);
        }
      }
    }
  }

  formAssociatedCallback() {
    let fa = this.getAttribute('form-assoc');

    if (!fa) {
      const name = this.getAttribute('name');
      if (name) {
        if (this.#hasProperty('value')) {
          fa = `value:${name}`;
        } else {
          return;
        }
      } else {
        return;
      }
    }

    const formAssoc: StringToString = {};
    const pairs = fa.split(',');
    for (const pair of pairs) {
      const [key, value] = pair.split(':');
      formAssoc[key.trim()] = value.trim();
    }
    this.#formAssoc = formAssoc;

    this.#formData = new FormData();
    this.#internals = this.attachInternals();
    this.#internals.setFormValue(this.#formData);

    const propNames = Object.keys(this.#ctor.properties);
    const map = this.#initialValuesMap;
    for (const propName of propNames) {
      map[propName] = (this as StringToAny)[propName];
    }
  }

  formResetCallback() {
    const map = this.#initialValuesMap;
    for (const propName of Object.keys(map)) {
      let value = map[propName];
      if (REF_RE.test(value)) value = this.#evaluateInContext(value);
      (this as StringToAny)[propName] = value;
    }
  }

  private static getAttrName(propName: string) {
    let attrName = this.propToAttrMap.get(propName);
    if (!attrName) {
      attrName = propName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      this.propToAttrMap.set(propName, attrName);
    }
    return attrName;
  }

  static getPropName(attrName: string) {
    let propName = this.attrToPropMap.get(attrName);
    if (!propName) {
      propName = attrName.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      this.attrToPropMap.set(attrName, propName);
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
        this.#throw(element, attrName, 'refers to an unsupported event name');
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
      (this as StringToAny)[propName] =
        type === Number ? stringToNumber(value) : value;
      this.#react(propName);
    });
  }

  #hasOwn(propName: string) {
    return Object.hasOwn(this.#ctor, propName);
  }

  #hasProperty(propName: string) {
    return Boolean(this.#ctor.properties[propName]);
  }

  #isComputedProp(propName: string) {
    return Boolean(this.#ctor.properties[propName]?.computed);
  }

  #makeReactive(root: ShadowRoot | HTMLElement) {
    const elements = Array.from(root.querySelectorAll('*')) as HTMLElement[];
    for (const element of elements) {
      this.#evaluateAttributes(element);
      if (!element.firstElementChild) this.#evaluateText(element);
    }
  }

  #verifyFormAssociated() {
    if (this.#ctor.formAssociated || this.closest('form') === null) return;
    const className = this.#ctor.name;
    this.#throw(
      this,
      undefined,
      `inside form, class ${className} requires "static formAssociated = true;"`
    );
  }

  propertyChangedCallback(
    _propName: string,
    _oldValue: unknown,
    _newValue: unknown
  ) {}

  #propRefName(element: HTMLElement, text: string | null) {
    if (!text || !REF_RE.test(text)) return;
    const propName = getPropName(text);
    if ((this as StringToAny)[propName] === undefined) {
      this.#throwInvalidRef(element, '', propName);
    }
    return propName;
  }

  #react(propName: string) {
    const exprs = this.#ctor.propToExprsMap.get(propName) || [];
    this.#evaluateExpressions(exprs);
  }

  #registerComputedProp(propName: string, config: PropertyConfigD) {
    const ctor = this.#ctor;
    const map = ctor.propToComputedMap;

    function register(referencedProp: string, expr: string) {
      let computes = map.get(referencedProp);
      if (!computes) {
        computes = [];
        map.set(referencedProp, computes);
      }
      computes.push([propName, expr]);
    }

    const {computed} = config;
    if (!computed) return;

    const matches = computed.match(REFS_RE) || [];
    for (const match of matches) {
      const referencedProp = getPropName(match);
      if ((this as StringToAny)[referencedProp] === undefined) {
        this.#throwInvalidRef(null, propName, referencedProp);
      }
      if (typeof (this as StringToAny)[referencedProp] !== 'function') {
        register(referencedProp, computed);
      }
    }

    for (const match of computed.matchAll(CALL_RE)) {
      const methodName = match[1];
      if (typeof (this as StringToAny)[methodName] !== 'function') {
        throw new WrecDError(
          `property ${propName} computed calls non-method ${methodName}`
        );
      }

      for (const [candidatePropName, candidateConfig] of Object.entries(
        ctor.properties
      )) {
        if (usedByArray(candidateConfig.usedBy)?.includes(methodName)) {
          register(candidatePropName, computed);
        }
      }
    }
  }

  #setComputed(propName: string, value: unknown) {
    this.#computedUpdates.add(propName);
    try {
      (this as StringToAny)[propName] = value;
    } finally {
      this.#computedUpdates.delete(propName);
    }
  }

  #registerPlaceholders(
    text: string | null,
    element: HTMLElement | CSSStyleRule,
    attrName: string | undefined = undefined
  ) {
    if (!text) return;

    const matches = this.#validateExpression(element, attrName, text);
    if (!matches) {
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
      if (typeof (this as StringToAny)[propName] === 'function') return;

      let exprs = ctor.propToExprsMap.get(propName);
      if (!exprs) {
        exprs = [];
        ctor.propToExprsMap.set(propName, exprs);
      }
      if (!exprs.includes(text)) exprs.push(text);
    });

    for (const [expr, refs] of this.#exprToRefsMap.entries()) {
      for (const ref of refs) {
        const target =
          ref instanceof HTMLElement || ref instanceof CSSStyleRule
            ? ref
            : (ref.element as HTMLElement);
        if (target instanceof CSSStyleRule) continue;
        if (!target.isConnected) {
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
      updateValue(element, attrName, String(value));
    } else {
      this.#updateElementContent(element, value);
    }
  }

  setAttributeSafe(name: string, value: string) {
    if (!this.hasAttribute(name)) this.setAttribute(name, value);
  }

  setFormValue(propName: string, value: string) {
    if (!this.#formData || !isPrimitive(value)) return;
    this.#formData.set(propName, value);
    this.#internals?.setFormValue(this.#formData);
  }

  static ssr(properties: StringToAny = {}): string {
    void properties;
    throw new WrecDError('Import WrecD from "wrec/ssr" to use the ssr method.');
  }

  #throw(
    element: HTMLElement | CSSStyleRule | null,
    attrName: string | undefined,
    message: string
  ) {
    const name =
      element instanceof HTMLElement ? element.localName : 'CSS rule';
    throw new WrecDError(
      `component ${this.#ctor.elementName}` +
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

    const config = this.#ctor.properties[propName];
    const {type, values} = config;
    if (!type) this.#throw(null, propName, 'does not specify its type');
    if (stringValue === null) {
      return type === Boolean ? false : defaultForConfig(config);
    }

    if (type === String) {
      if (values && !values.includes(stringValue)) {
        const allowed = values.map(value => `"${value}"`).join(', ');
        this.#throw(null, propName, `must be one of ${allowed}`);
      }
      return stringValue;
    }
    if (type === Number) return stringToNumber(stringValue);
    if (type === Boolean) {
      if (stringValue === 'true') return true;
      if (stringValue === 'false' || stringValue === 'null') return false;
      const attrName = this.#attributeName(propName, config);
      if (stringValue && stringValue !== attrName) {
        this.#throw(
          null,
          propName,
          'is a Boolean attribute, so its value must match attribute name or be missing'
        );
      }
      return stringValue === '' || stringValue === attrName;
    }
  }

  #updateAttribute(
    propName: string,
    type: AnyClass,
    value: any,
    attrName: string
  ) {
    if (isPrimitive(value) && !this.#isComputedProp(propName)) {
      const oldValue =
        type === Boolean
          ? this.hasAttribute(attrName)
          : this.#typedAttribute(propName, attrName);
      if (value !== oldValue) {
        this.#syncingAttribute = true;
        try {
          if (typeof value === 'boolean') {
            if (value) {
              super.setAttribute(attrName, attrName);
            } else {
              super.removeAttribute(attrName);
            }
          } else {
            super.setAttribute(attrName, String(value));
          }
        } finally {
          this.#syncingAttribute = false;
        }
      }
    }
  }

  #updateComputedProperties(propName: string) {
    const map = this.#ctor.propToComputedMap;
    const computes = map.get(propName) || [];
    for (const [computedName, expr] of computes) {
      this.#setComputed(computedName, this.#evaluateInContext(expr));
    }
  }

  #updateElementContent(element: HTMLElement | CSSStyleRule, value: unknown) {
    if (value === undefined) return;

    const isHTML = element instanceof HTMLElement;
    if (Array.isArray(value)) value = value.join('');
    const t = typeof value;
    if (t !== 'string' && t !== 'number') {
      this.#throw(
        element,
        undefined,
        ' computed content is not a string or number'
      );
    }

    const text = String(value);

    if (element instanceof HTMLElement && isTextArea(element)) {
      (element as HTMLTextAreaElement).value = text;
    } else if (isHTML && t === 'string' && text.trim().startsWith('<')) {
      element.innerHTML = sanitize(text);
      this.#wireEvents(element);
      this.#makeReactive(element);
    } else if (isHTML) {
      element.textContent = text;
    }
  }

  #updateParentProperty(propName: string, value: any) {
    const parentProp = this.#propToParentPropMap.get(propName);
    if (!parentProp) return;

    const root = this.getRootNode();
    if (!(root instanceof ShadowRoot)) return;
    const {host} = root;
    if (!host) return;

    (host as StringToAny)[parentProp] = value;
  }

  #usedBy() {
    const ctor = this.#ctor;

    function buildMap(this: WrecD) {
      const map = new Map<string, string[]>();
      ctor.methodToExprsMap = map;
      const allExprs = Array.from(this.#exprToRefsMap.keys());
      for (const expr of allExprs) {
        for (const match of expr.matchAll(CALL_RE)) {
          const methodName = match[1];
          let exprs = map.get(methodName);
          if (!exprs) {
            exprs = [];
            map.set(methodName, exprs);
          }
          if (!exprs.includes(expr)) exprs.push(expr);
        }
      }
    }

    const {properties, propToExprsMap} = ctor;
    for (const [propName, config] of Object.entries(properties)) {
      const usedBy = usedByArray(config.usedBy);
      if (!usedBy) continue;

      if (!ctor.methodToExprsMap) buildMap.call(this);
      const {methodToExprsMap} = ctor;

      let propExprs = propToExprsMap.get(propName);
      if (!propExprs) {
        propExprs = [];
        propToExprsMap.set(propName, propExprs);
      }

      for (const method of usedBy) {
        if (typeof (this as StringToAny)[method] !== 'function') {
          throw new WrecDError(
            `property ${propName} usedBy contains non-method ${method}`
          );
        }

        const methodExprs = methodToExprsMap!.get(method) || [];
        for (const expr of methodExprs) {
          if (!propExprs.includes(expr)) propExprs.push(expr);
        }
      }
    }
  }

  useState(state: WrecState, map?: StringToString) {
    if (!map) {
      map = {};
      for (const prop of Object.keys(state)) {
        map[prop] = prop;
      }
    }

    this.#validateStateMap(state, map);

    for (const [stateProp, componentProp] of Object.entries(map)) {
      if (this.#hasProperty(componentProp)) {
        const value = getPathValue(state, stateProp);
        if (value !== undefined) (this as StringToAny)[componentProp] = value;
        this.#propToStateMap.set(componentProp, {state, stateProp});
      }
    }
    state.addListener(this, map);
  }

  #validateAttributes() {
    const propNames = new Set(Object.keys(this.#ctor.properties));
    for (const attrName of this.getAttributeNames()) {
      if (globalAttributes.has(attrName)) continue;
      if (attrName.startsWith('on')) continue;
      if (attrName === 'form-assoc') {
        this.#verifyFormAssociated();
        continue;
      }
      const propName = this.#propNameFromAttribute(attrName);
      if (!propName || !propNames.has(propName)) {
        if (attrName === 'name') {
          this.#verifyFormAssociated();
          continue;
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
      if ((this as StringToAny)[propName] === undefined) {
        this.#throwInvalidRef(element, attrName, propName);
      }
    });

    return matches;
  }

  #validateStateMap(state: WrecState, map: StringToString) {
    for (const [statePath, componentProp] of Object.entries(map)) {
      let value = getPathValue(state, statePath);
      if (value === undefined) {
        this.#throw(this, undefined, `invalid state path "${statePath}"`);
      }

      value = (this as StringToAny)[componentProp];
      if (!this.#hasProperty(componentProp)) {
        this.#throw(
          null,
          componentProp,
          'refers to missing property in useState map'
        );
      }
    }
  }

  #validateType(propName: string, type: AnyClass, value: any) {
    const {values} = this.#ctor.properties[propName];
    if (values) {
      let msg;
      if (type !== String) {
        msg = 'declares allowed values, but its type is not String';
      } else if (typeof value !== 'string') {
        msg = `value is a ${typeof value}, but type is String`;
      } else if (!values.includes(value)) {
        const allowed = values.map(value => `"${value}"`).join(', ');
        msg = `must be one of ${allowed}`;
      }
      if (msg) this.#throw(null, propName, msg);
    }

    if (value instanceof type) return;

    let t = typeof value;
    if (t === 'object' && value !== null) {
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
          if (typeof (this as StringToAny)[attrValue] === 'function') {
            fn = (event: Event) => (this as StringToAny)[attrValue](event);
          } else {
            this.#validateExpression(element, attrName, attrValue);
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

  #attributeName(propName: string, config: PropertyConfigD) {
    return config.attrName || this.#ctor.getAttrName(propName);
  }

  #propNameFromAttribute(attrName: string) {
    const {properties} = this.#ctor;
    for (const [propName, config] of Object.entries(properties)) {
      if (this.#attributeName(propName, config) === attrName) return propName;
    }
  }
}

export function css(strings: TemplateStringsArray, ...values: unknown[]) {
  let result = interpolate(strings, values);

  while (true) {
    const match = CSS_PROPERTY_RE.exec(result);
    if (!match) break;

    const propValue = match[2];
    if (REFS_TEST_RE.test(propValue)) {
      const propName = match[1];
      if (!propName.startsWith('--')) {
        const replacement = `--${propName}: ${propValue};
      ${propName}: var(--${propName})`;
        result = replace(result, match.index, match[0].length, replacement);
      }
    }
  }

  return result;
}

export function html(strings: TemplateStringsArray, ...values: unknown[]) {
  let result = interpolate(strings, values);

  while (true) {
    const match = HTML_ELEMENT_TEXT_RE.exec(result);
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
