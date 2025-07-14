const FIRST_CHAR = "a-zA-Z_$";
const OTHER_CHAR = FIRST_CHAR + "0-9";
const IDENTIFIER = `[${FIRST_CHAR}][${OTHER_CHAR}]*`;
const REFERENCE_RE = new RegExp(`^this.${IDENTIFIER}$`);
const REFERENCES_RE = new RegExp(`this.${IDENTIFIER}`, "g");
const SKIP = "this.".length;

class Wrec extends HTMLElement {
  static #template = document.createElement("template");

  #expressionToReferencesMap = new Map();
  #formData;
  #internals;
  #propertyToBindingsMap = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const map = this.constructor["#propertyToExpressionsMap"];
    if (!map) this.constructor["#propertyToExpressionsMap"] = new Map();

    if (this.constructor.formAssociated) {
      this.#internals = this.attachInternals();
      this.#formData = new FormData();
      this.#internals.setFormValue(this.#formData);
    }
  }

  attributeChangedCallback(attrName, _, newValue) {
    // Update the corresponding property.
    const value = this.#typedValue(attrName, newValue);
    this[attrName] = value;
    this.#setFormValue(attrName, value);
  }

  // attrName must be "value" OR undefined!
  #bind(element, propertyName, attrName) {
    element.addEventListener("input", (event) => {
      this[propertyName] = event.target.value;
    });

    let bindings = this.#propertyToBindingsMap.get(propertyName);
    if (!bindings) {
      bindings = [];
      this.#propertyToBindingsMap.set(propertyName, bindings);
    }
    bindings.push(attrName ? { element, attrName } : element);
  }

  // This is not private so it can be called from subclasses.
  buildDOM() {
    const clazz = this.constructor;
    let template = clazz.css ? `<style>${clazz.css}</style>` : "";
    template += clazz.html;
    Wrec.#template.innerHTML = template;

    this.shadowRoot.replaceChildren(Wrec.#template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#validateAttributes();
    this.#defineProperties();
    this.buildDOM();

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      this.#wireEvents(this.shadowRoot);
      this.#makeReactive(this.shadowRoot);
      this.constructor.processed = true;
    });
  }

  #defineProperties() {
    const properties = this.constructor.properties;
    const { observedAttributes } = this.constructor;
    for (const [name, config] of Object.entries(properties)) {
      this.#defineProperty(name, config, observedAttributes);
    }
  }

  #defineProperty(propertyName, config, observedAttributes) {
    // Copy the property value to a new property with a leading underscore.
    // The property is replaced below with Object.defineProperty.
    const value =
      observedAttributes.includes(propertyName) &&
      this.hasAttribute(propertyName)
        ? this.#typedAttribute(propertyName)
        : config.value;
    const privateName = "#" + propertyName;
    this[privateName] = value;

    Object.defineProperty(this, propertyName, {
      enumerable: true,
      get() {
        return this[privateName];
      },
      set(value) {
        const oldValue = this[privateName];
        if (value === oldValue) return;

        this[privateName] = value;

        // If there is a matching attribute on the custom element,
        // update that attribute.
        if (this.hasAttribute(propertyName)) {
          const oldValue = this.#typedAttribute(propertyName);
          if (value !== oldValue) {
            this.#updateAttribute(this, propertyName, value);
          }
        }

        this.#react(propertyName);

        // If this property is bound to a parent web component property,
        // update that as well.
        const map = this.propertyToParentPropertyMap;
        const parentProperty = map ? map.get(propertyName) : null;
        if (parentProperty) {
          const parent = this.getRootNode().host;
          parent.setAttribute(parentProperty, value);
        }

        this.#setFormValue(propertyName, value);
      },
    });
  }

  // This inserts a dash before each uppercase letter
  // that is preceded by a lowercase letter or digit.
  static elementName() {
    return this.name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }

  #evaluateAttributes(element) {
    const isWC = element.localName.includes("-");

    for (const attrName of element.getAttributeNames()) {
      const text = element.getAttribute(attrName);

      // If the attribute value is a single property reference,
      // configure two-way data binding.
      const propertyName = this.#propertyReferenceName(element, text);
      if (propertyName) {
        const value = this[propertyName];
        if (!value) {
          this.#throwInvalidReference(element, attrName, propertyName);
        }

        element[propertyName] = value;
        if (attrName === "value") this.#bind(element, propertyName, attrName);

        // If the element is a web component,
        // save a mapping from the attribute name in this web component
        // to the property name in the parent web component.
        if (isWC) {
          let map = element.propertyToParentPropertyMap;
          if (!map) {
            map = new Map();
            element.propertyToParentPropertyMap = map;
          }
          map.set(attrName, propertyName);
        }
      }

      this.#registerPlaceholders(text, element, attrName);
    }
  }

  #evaluateInContext(expression) {
    // oxlint-disable-next-line no-eval
    return (() => eval(expression)).call(this);
  }

  #evaluateText(element) {
    const { localName } = element;

    // Don't allow style elements to be affected by property values.
    if (localName === "style") return;

    const text = element.textContent.trim();
    // Only add a binding the element is a "textarea" and
    // its text content is a single property reference.
    const propertyName = this.#propertyReferenceName(element, text);
    if (localName === "textarea" && propertyName) {
      // Configure data binding.
      this.#bind(element, propertyName);
      element.textContent = this[propertyName];
    } else {
      this.#registerPlaceholders(text, element);
    }
  }

  #makeReactive(root) {
    const elements = root.querySelectorAll("*");
    for (const element of elements) {
      this.#evaluateAttributes(element);

      // If the element has no child elements, evaluate its text content.
      if (!element.firstElementChild) this.#evaluateText(element);
    }
    /* These lines are useful for debugging.
    const map = this.constructor["#propertyToExpressionsMap"];
    console.log("#propertyToExpressionsMap =", map);
    console.log(
      "#expressionToReferencesMap =",
      this.#expressionToReferencesMap
    );
    */
  }

  static get observedAttributes() {
    return Object.keys(this.properties || {});
  }

  #propertyReferenceName(element, text) {
    if (!REFERENCE_RE.test(text)) return;
    const propertyName = text.substring(SKIP);
    if (!this[propertyName]) {
      this.#throwInvalidReference(element, null, propertyName);
    }
    return propertyName;
  }

  #react(propertyName) {
    // Update all expression references.
    const map = this.constructor["#propertyToExpressionsMap"];
    const expressions = map.get(propertyName) || [];
    for (const expression of expressions) {
      const value = this.#evaluateInContext(expression);
      const references = this.#expressionToReferencesMap.get(expression) || [];
      for (const reference of references) {
        if (reference instanceof Element) {
          this.#updateElementContent(reference, value);
        } else {
          const { element, attrName } = reference;
          this.#updateAttribute(element, attrName, value);
        }
      }
    }

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      this.#updateBindings(propertyName);
    });
  }

  static register() {
    const elementName = this.elementName();
    if (!customElements.get(elementName)) {
      customElements.define(elementName, this);
    }
  }

  // Do not place untrusted expressions in
  // attribute values or the text content of elements!
  #registerPlaceholders(text, element, attrName) {
    const matches = this.#validateExpression(element, attrName, text);
    if (!matches) return;
    // Only map properties to expressions once for each web component because
    // the mapping will be the same for every instance of the web component.
    if (!this.constructor.processed) {
      matches.forEach((capture) => {
        const propertyName = capture.substring(SKIP);
        const map = this.constructor["#propertyToExpressionsMap"];
        let expressions = map.get(propertyName);
        if (!expressions) {
          expressions = [];
          map.set(propertyName, expressions);
        }
        expressions.push(text);
      });
    }

    let references = this.#expressionToReferencesMap.get(text);
    if (!references) {
      references = [];
      this.#expressionToReferencesMap.set(text, references);
    }
    references.push(attrName ? { element, attrName } : element);

    const value = this.#evaluateInContext(text);
    if (attrName) {
      this.#updateAttribute(element, attrName, value);
    } else {
      this.#updateElementContent(element, value);
    }
  }

  #setFormValue(propertyName, value) {
    if (!this.#formData) return;
    this.#formData.set(propertyName, value);
    this.#internals.setFormValue(this.#formData);
  }

  #throw(element, attrName, message) {
    throw new Error(
      `component ${this.constructor.elementName()}` +
        (element ? `, element "${element.localName}"` : "") +
        (attrName ? `, attribute "${attrName}"` : "") +
        ` ${message}`
    );
  }

  #throwInvalidReference(element, attrName, propertyName) {
    this.#throw(
      element,
      attrName,
      `refers to missing property "${propertyName}"`
    );
  }

  #typedAttribute(attrName) {
    return this.#typedValue(attrName, this.getAttribute(attrName));
  }

  #typedValue(propertyName, stringValue) {
    if (stringValue?.match(REFERENCES_RE)) return stringValue;

    const type = this.constructor.properties[propertyName].type;
    if (type === Number) {
      const number = Number(stringValue);
      if (!isNaN(number)) return number;
      this.#throw(
        null,
        propertyName,
        `must be a number, but was "${stringValue}"`
      );
    }
    if (type === Boolean) {
      if (stringValue && stringValue !== propertyName) {
        this.#throw(
          null,
          propertyName,
          "is a Boolean attribute, so its value " +
            "must match attribute name or be missing"
        );
      }
    }
    return stringValue;
  }

  #updateAttribute(element, attrName, value) {
    const currentValue = element.getAttribute(attrName);
    if (typeof value === "boolean") {
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

  #updateBindings(propertyName) {
    const value = this[propertyName];
    const bindings = this.#propertyToBindingsMap.get(propertyName) || [];
    for (const binding of bindings) {
      if (binding instanceof Element) {
        if (binding.localName === "textarea") {
          binding.value = value;
        } else {
          binding.textContent = value;
        }
      } else {
        const { element, attrName } = binding;
        this.#updateAttribute(element, attrName, value);
        element[attrName] = value;
      }
    }
  }

  #updateElementContent(element, value) {
    const { localName } = element;
    const t = typeof value;
    if (t !== "string" && t !== "number") {
      this.#throw(element, null, ` computed content is not a string or number`);
    }

    if (localName === "textarea") {
      element.value = value;
    } else if (t === "string" && value.trim().startsWith("<")) {
      element.innerHTML = value;
      this.#wireEvents(element);
      this.#makeReactive(element);
    } else {
      element.textContent = value;
    }
  }

  #validateAttributes() {
    const propertyNames = new Set(Object.keys(this.constructor.properties));
    for (const attrName of this.getAttributeNames()) {
      if (!propertyNames.has(attrName)) {
        this.#throw(null, attrName, "is not a supported attribute");
      }
    }
  }

  #validateExpression(element, attrName, expression) {
    const matches = expression.match(REFERENCES_RE);
    if (!matches) return;

    matches.forEach((capture) => {
      const propertyName = capture.substring(SKIP);
      if (this[propertyName] === undefined) {
        this.#throwInvalidReference(element, attrName, propertyName);
      }
    });

    return matches;
  }

  #wireEvents(root) {
    const elements = root.querySelectorAll("*");
    for (const element of elements) {
      for (const attr of element.attributes) {
        const { name } = attr;
        if (name.startsWith("on")) {
          const eventName = name.slice(2).toLowerCase();
          const { value } = attr;
          this.#validateExpression(element, name, value);

          let fn;
          if (typeof this[value] === "function") {
            fn = (event) => this[value](event);
          } else {
            const matches = this.#validateExpression(element, name, value);
            if (matches) {
              // oxlint-disable-next-line no-eval
              fn = () => eval(value);
            } else {
              this.#throwInvalidReference(element, name, value);
            }
          }
          element.addEventListener(eventName, fn);
          element.removeAttribute(name);
        }
      }
    }
  }
}

export default Wrec;
export const css = String.raw;
export const html = String.raw;
