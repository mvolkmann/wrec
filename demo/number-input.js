import Wreck from "../wreck.js";

class NumberInput extends Wreck {
  static formAssociated = true;
  static properties = {
    label: { type: String, reflect: true },
    value: { type: Number, reflect: true },
  };

  css() {
    return /*css*/ `
      button {
        background-color: cornflowerblue;
        border: none;
        border-radius: 50%;
        color: white;
      }

      input[type="number"] {
        text-align: right;
        width: 2rem;
      }

      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        appearance: none;
      }

      label { font-weight: bold; }
    `;
  }

  html() {
    return /*html*/ `
      <div>
        <label>this.label</label>
        <button onclick="decrement" type="button">-</button>
        <input type="number" value="this.value" />
        <button onclick="increment" type="button">+</button>
     </div>
    `;
  }

  decrement() {
    if (this.value > 0) this.value--;
  }

  increment() {
    this.value++;
  }
}

NumberInput.register();
