import Wrec from "../wrec.js";

class SelectList extends Wrec {
  static formAssociated = true;

  static properties = {
    name: { type: String },
    options: { type: String },
    value: { type: String },
  };

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
