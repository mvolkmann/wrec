import Wrec, { css, html } from "../wrec.js";

class NumberSlider extends Wrec {
  static properties = {
    label: { type: String },
    value: { type: Number },
  };

  static css = css`
    input[type="number"] {
      width: 6rem;
    }

    label {
      font-weight: bold;
    }
  `;

  static html = html`
    <div>
      <label>this.label</label>
      <input type="range" min="0" value="this.value" />
    </div>
  `;
}

NumberSlider.register();
