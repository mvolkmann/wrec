import Wrec, {css, html} from '../wrec';

class NumberInput2 extends Wrec {
  static formAssociated = true;

  static properties = {
    label: {type: String},
    value: {type: Number}
  };

  static css = css`
    button {
      background-color: cornflowerblue;
      border: none;
      border-radius: 50%;
      color: white;
    }

    input[type='number'] {
      text-align: right;
      width: 2rem;
    }

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      appearance: none;
    }

    label {
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.autoForm = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value === undefined) this.value = 0;
    this.setFormValue(this.label.toLowerCase(), this.value);
  }

  decrement() {
    this.setValue(this.value - 1);
  }

  handleChange(event) {
    this.setValue(event.target.value);
  }

  increment() {
    this.setValue(this.value + 1);
  }

  setValue(value) {
    this.value = value;
    this.setFormValue(this.label.toLowerCase(), value);
  }

  static html = html`
    <label>this.label</label>
    <button disabled="this.value === 0" onclick="decrement" type="button">
      -
    </button>
    <input min="0" type="number" value="this.value" onchange="handleChange" />
    <button onclick="increment" type="button">+</button>
  `;
}

NumberInput2.register();
