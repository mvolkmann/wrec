import Wreck from "../wreck.js";

class NumberSlider extends Wreck {
  static properties = {
    label: { type: String, reflect: true },
    value: { type: Number, reflect: true },
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
