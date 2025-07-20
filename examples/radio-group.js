import Wrec, { css, html } from "../wrec.js";

class RadioGroup extends Wrec {
  static formAssociated = true;

  static properties = {
    default: { type: String },
    labels: { type: String },
    name: { type: String, required: true },
    values: { type: String, required: true },
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
      this.values.split(",").map((value, index) => this.makeRadio(value,
      index)).join("")
    </div>
  `;

  connectedCallback() {
    super.connectedCallback();
    if (!this.default) this.default = this.values.split(",")[0];
    if (!this.value) this.value = this.default;
    this.#fixValue();
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === "value") {
      // Update the checked state of the radio buttons.
      const inputs = this.shadowRoot.querySelectorAll("input");
      for (const input of inputs) {
        input.checked = input.value === newValue;
      }
    } else if (attrName === "values") {
      this.#fixValue();
    }
  }

  // This handles the case when the specified value
  // is not in the list of options.
  #fixValue() {
    requestAnimationFrame(() => {
      const values = this.values.split(",");
      if (!values.includes(this.value)) this.value = values[0];
    });
  }

  // This method cannot be private because it is called when
  // a change event is dispatched from a radio button.
  handleChange(event) {
    this.value = event.target.value;
  }

  // This method cannot be private because it is
  // called from the expression in the html method.
  makeRadio(value, index) {
    value = value.trim();
    const label = this.labels ? this.labels.split(",")[index].trim() : value;
    return html`
      <div>
        <input
          type="radio"
          id="${value}"
          name="${this.name}"
          onchange="handleChange"
          value="${value}"
          ${value === this.value ? "checked" : ""}
        />
        <label for="${value}">${label}</label>
      </div>
    `;
  }
}

RadioGroup.register();
