import Wrec, { html } from "../wrec.js";

class SelectList extends Wrec {
  static formAssociated = true;

  static properties = {
    name: { type: String },
    options: { type: String },
    value: { type: String },
  };

  static html = html`
    <select name="${this.name}" value="this.value">
      this.options.split(",").map((option) => this.makeOption(option)).join("")
    </select>
  `;

  connectedCallback() {
    super.connectedCallback();

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      const options = this.options.split(",");
      if (!this.value || !options.includes(this.value)) {
        this.value = options[0];
      }
    });
  }

  // This method cannot be private because it is
  // called from the expression in the html method.
  makeOption(option) {
    option = option.trim();
    return html` <option value="${option}">${option}</option> `;
  }
}

SelectList.register();
