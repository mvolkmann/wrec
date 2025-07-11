import Wrec, { css, html } from "../wrec.js";

class NumberSlider extends Wrec {
  static properties = {
    label: { type: String },
    value: { type: Number },
  };

  static css = css`
    :host {
      display: block;
    }

    input[type="number"] {
      width: 6rem;
    }

    label {
      font-weight: bold;
    }
  `;

  static html = html`
    <label>this.label</label>
    <input type="range" min="0" value="this.value" />
  `;
}

NumberSlider.register();
