import Wrec, { css, html } from "../wrec.js";

class DataBinding extends Wrec {
  static properties = {
    color: { type: String },
    options: { type: String },
  };

  static css = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `;

  static html = html`
    <div>
      <label>Color Options (comma-separated):</label>
      <input value="this.options" />
    </div>
    <radio-group
      name="color1"
      options="this.options"
      value="this.color"
    ></radio-group>
    <select-list
      name="color2"
      options="this.options"
      value="this.color"
    ></select-list>
    <p>You selected the color <span>this.color</span>.</p>
  `;
}

DataBinding.register();
