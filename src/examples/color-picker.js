import {css, html, Wrec} from '../wrec';
// See connectedCallback below.
//import './number-slider';

class ColorPicker extends Wrec {
  static formAssociated = true;

  static properties = {
    labelWidth: {type: String, value: '3rem'},
    red: {type: Number},
    green: {type: Number},
    blue: {type: Number},
    color: {
      type: String,
      computed: '`rgb(${this.red}, ${this.green}, ${this.blue})`'
    }
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
      background-color: this.color;
      height: 5rem;
      width: 5rem;
    }
  `;

  static html = html`
    <div id="swatch"></div>
    <div id="sliders">
      <!-- prettier-ignore -->
      ${this.makeSlider('Red')}
      ${this.makeSlider('Green')}
      ${this.makeSlider('Blue')}
    </div>
  `;

  static makeSlider(label) {
    return html`
      <number-slider
        label=${label}
        label-width="this.labelWidth"
        max="255"
        value="this.${label.toLowerCase()}"
      ></number-slider>
    `;
  }

  /*
  // If number-slider is included with an import statement,
  // the following is required to ensure it is defined before use.
  async connectedCallback() {
    await customElements.whenDefined('number-slider');
    super.connectedCallback();
  }
  */
}

ColorPicker.register();
