import Wrec from "../wrec.js";

class SelectList extends Wrec {
  static formAssociated = true;

  static properties = {
    name: { type: String },
    options: { type: String, reflect: true },
    value: { type: String, reflect: true },
  };

  html() {
    //TODO: Why does selecting an option trigger a change to the options attribute?
    return /*html*/ `
      <select name="${this.name}" onchange="handleChange" value="this.value">
        this.options.split(",").map((option) => this.makeOption(option)).join("")
      </select>
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
  makeOption(option) {
    return /*html*/ `
      <option value="${option}">${option}</option>
    `;
  }
}

SelectList.register();
