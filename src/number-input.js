import Wrec, {css, html} from './wrec.ts';

class NumberInput extends Wrec {
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

  static html = html`
    <label>this.label</label>
    <button disabled="this.value === 0" onclick="this.value--" type="button">
      -
    </button>
    <input min="0" type="number" value="this.value" />
    <button onclick="this.value++" type="button">+</button>
  `;
}

NumberInput.register();
