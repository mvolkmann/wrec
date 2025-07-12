import Wrec, { css, html } from "../wrec.js";

class RadioGroup extends Wrec {
  static formAssociated = true;

  static properties = {
    default: { type: String },
    name: { type: String },
    options: { type: String },
    value: { type: String },
  };

  static css = css`
    :host > div {
      display: flex;
      gap: 0.5rem;

      > div {
        display: flex;
        align-items: center;
      }
    }
  `;

  static html = html`
    <div>
      this.options.split(",").map((option) => this.makeRadio(option)).join("")
    </div>
  `;

  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === "value") {
      // Update the checked state of the radio buttons.
      const inputs = this.shadowRoot.querySelectorAll("input");
      for (const input of inputs) {
        input.checked = input.value === newValue;
      }
    } else if (attrName === "options") {
      this.#fixValue();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.default) this.default = this.options.split(",")[0];
    if (!this.value) this.value = this.default;
    this.#fixValue();
  }

  #fixValue() {
    requestAnimationFrame(() => {
      const options = this.options.split(",");
      if (!options.includes(this.value)) this.value = options[0];
    });
  }

  // This method cannot be private because it is called when
  // a change event is dispatched from a radio button.
  handleChange(event) {
    const { value } = event.target;
    this.value = value;

    // This allows users of the this web component to listen for changes.
    this.dispatchEvent(new Event("change"));
  }

  // This method cannot be private because it is
  // called from the expression in the html method.
  makeRadio(option) {
    return html`
      <div>
        <input
          type="radio"
          id="${option}"
          name="${this.name}"
          onchange="handleChange"
          value="${option}"
          ${option === this.value ? "checked" : ""}
        />
        <label for="${option}">${option}</label>
      </div>
    `;
  }
}

RadioGroup.register();
