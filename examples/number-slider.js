import Wrec, { css, html } from "../wrec.js";

class NumberSlider extends Wrec {
  static properties = {
    max: { type: Number, value: 100 },
    min: { type: Number, value: 0 },
    label: { type: String },
    value: { type: Number },
  };

  static css = css`
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
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
    <input type="range" min="this.min" max="this.max" value="this.value" />
    <span>this.value</span>
  `;
}

NumberSlider.register();
