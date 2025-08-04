import {State} from './state';
import Wrec, {css, html} from './wrec';

const capitalize = str =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

class DataBinding2 extends Wrec {
  static properties = {
    color: {type: String},
    colors: {type: String},
    labels: {
      type: String,
      computed: 'this.getLabels()',
      uses: 'colors'
    },
    size: {type: Number, value: 18}
  };

  static css = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: sans-serif;
    }
    p {
      color: this.color;
      font-size: this.size + 'px';
      margin: 6px 0;
    }
  `;

  static html = html`
    <div>
      <label>Color Options (comma-separated):</label>
      <input value="this.colors" />
    </div>
    <radio-group name="color1"></radio-group>
    <select-list name="color2"></select-list>
    <number-slider label="Size" max="48" min="12"></number-slider>
    <p>You selected the color <span id="selected-color">this.color</span>.</p>
  `;

  connectedCallback() {
    super.connectedCallback();

    requestAnimationFrame(() => {
      this.colors = 'red,green,blue'; //TODO: Why repeat this string?
      const labels = this.getLabels();

      const db = document.querySelector('data-binding2');
      const {shadowRoot} = db;
      const rg = shadowRoot.querySelector('radio-group');
      const sl = shadowRoot.querySelector('select-list');
      const ns = shadowRoot.querySelector('number-slider');

      const state = new State();
      rg.useState(state, {color: 'value', colors: 'values', labels: 'labels'});
      sl.useState(state, {color: 'value', colors: 'values', labels: 'labels'});
      ns.useState(state, {size: 'value'});
      this.useState(state, {
        color: 'color',
        colors: 'colors',
        labels: 'labels',
        size: 'size'
      });

      state.set('colors', 'red,green,blue');
      state.set('labels', labels);
      state.set('color', 'blue');
      state.set('size', 18);
    });
  }

  getLabels() {
    return this.colors.split(',').map(capitalize).join(',');
  }
}

DataBinding2.register();
