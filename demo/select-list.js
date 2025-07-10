import Wrec from "../wrec.js";

class SelectList extends Wrec {
  static formAssociated = true;

  static properties = {
    name: { type: String },
    options: { type: String },
    value: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      const options = this.options.split(",");
      const firstOption = options[0];
      if (!this.default) this.default = firstOption;
      if (!this.value) this.value = this.default;
      if (!options.includes(this.value)) this.value = firstOption;
    });
  }

  html() {
    return /*html*/ `
      <select name="${this.name}" value="this.value">
        this.options.split(",").map((option) => this.makeOption(option)).join("")
      </select>
    `;
  }

  // This method cannot be private because it is
  // called from the expression in the html method.
  makeOption(option) {
    return /*html*/ `
      <option value="${option}">${option}</option>
    `;
  }
}

SelectList.register();
