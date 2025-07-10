import Wrec from "../wrec.js";

class NumberSlider extends Wrec {
  static properties = {
    label: { type: String },
    value: { type: Number },
  };

  css() {
    return /*css*/ `
      input[type="number"] {
        width: 6rem;
      }

      label { font-weight: bold; }
    `;
  }

  html() {
    return /*html*/ `
      <div>
        <label>this.label</label>
        <input type="range" min="0" value="this.value" />
     </div>
    `;
  }
}

NumberSlider.register();
