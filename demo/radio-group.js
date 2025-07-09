import Wrec from "wrec";

class RadioGroup extends Wrec {
  // This is the only thing a Wrec subclass
  // must contain to contribute to form submission.
  static formAssociated = true;

  static properties = {
    default: { type: String },
    name: { type: String },
    options: { type: String, reflect: true },
    value: { type: String, reflect: true },
  };

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    if (attr === "value") {
      // Update the checked state of the radio buttons.
      const inputs = this.shadowRoot.querySelectorAll("input");
      for (const input of inputs) {
        input.checked = input.value === newValue;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.default) this.default = this.options.split(",")[0];
    if (!this.value) this.value = this.default;
  }

  css() {
    return /*css*/ `
      .radio-group {
        display: flex;
        gap: 0.25rem;

        > div {
          display: flex;
          align-items: center;
        } 
      }
    `;
  }

  html() {
    // This web component uses iteration to determine what to render.
    return /*html*/ `
      <div class="radio-group">
        this.options.split(",").map((option) => this.makeRadio(option)).join("")
      </div>
    `;
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
    return /*html*/ `
      <div>
        <input
          type="radio"
          id="${option}"
          name="${this.name}"
          value="${option}"
          ${option === this.value ? "checked" : ""}
          onchange="handleChange"
        />
        <label for="${option}">${option}</label>
      </div>
    `;
  }
}

RadioGroup.register();
