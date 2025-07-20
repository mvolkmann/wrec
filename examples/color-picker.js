import Wrec, { css, html } from "../wrec.js";

class ColorPicker extends Wrec {
  static properties = {
    labelWidth: { type: String, value: "3rem" },
    red: { type: Number },
    green: { type: Number },
    blue: { type: Number },
    color: { type: String },
  };

  static css = css`
    :host {
      display: flex;
      gap: 0.5rem;
    }

    #sliders {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #swatch {
      background-color: var(--color);
      height: 5rem;
      width: 5rem;
    }
  `;

  static html = html`
    <div id="swatch"></div>
    <div id="sliders">
      <number-slider
        label="Red"
        labelwidth="this.labelWidth"
        max="255"
        value="this.red"
      ></number-slider>
      <number-slider
        label="Green"
        labelwidth="this.labelWidth"
        max="255"
        value="this.green"
      ></number-slider>
      <number-slider
        label="Blue"
        labelwidth="this.labelWidth"
        max="255"
        value="this.blue"
      ></number-slider>
    </div>
  `;

  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    this.color = `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
}

ColorPicker.register();
