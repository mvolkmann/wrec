import Wrec, { css, html } from "../wrec.js";

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

class DataBinding extends Wrec {
  static properties = {
    color: { type: String },
    colors: { type: String, required: true },
    size: { type: Number, value: 18 },
  };

  static css = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: sans-serif;
    }
    p {
      --color: this.color;
      --size: this.size;
      color: var(--color);
      font-size: calc(var(--size) * 1px);
      margin: 6px 0;
    }
  `;

  //TODO: Implement computed properties.
  // labels="this.colors.split(',').map(capitalize).join(',')"
  static html = html`
    <div>
      <label>Color Options (comma-separated):</label>
      <input value="this.colors" />
    </div>
    <radio-group
      name="color1"
      values="this.colors"
      value="this.color"
    ></radio-group>
    <select-list
      name="color2"
      values="this.colors"
      value="this.color"
    ></select-list>
    <number-slider
      label="Size"
      max="48"
      min="12"
      value="this.size"
    ></number-slider>
    <p>You selected the color <span>this.color</span>.</p>
    <p>The this. reference is escaped here: <span>this..color</span>.</p>
  `;
}

DataBinding.register();
