import {WrecState} from '../wrec-state';
import {css, html, Wrec} from '../wrec';

const capitalize = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

const colors = 'red,green,blue';
const state = new WrecState('vault', false, {
  color: 'red',
  colors,
  labels: getLabels(colors),
  size: 18
});
state.addListener(
  {
    changed(statePath: string, componentProperty: string, newValue: unknown) {
      if (componentProperty === 'colors') {
        state.labels = getLabels(newValue as string);
      }
    }
  },
  {colors}
);

function getLabels(colors: string): string {
  return colors.split(',').map(capitalize).join(',');
}

class DataBinding2 extends Wrec {
  static properties = {
    color: {type: String},
    colors: {type: String},
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
    <radio-group
      legend="Color"
      name="color"
      form-assoc="value:color1"
    ></radio-group>
    <select-list form-assoc="value:color2"></select-list>
    <number-slider label="Size" max="48" min="12"></number-slider>
    <p>You selected the color <span id="selected-color">this.color</span>.</p>
  `;

  connectedCallback() {
    super.connectedCallback();

    requestAnimationFrame(() => {
      const db = document.querySelector('data-binding2')!;
      const root = db.shadowRoot!;
      const rg = root.querySelector('radio-group') as Wrec;
      const sl = root.querySelector('select-list') as Wrec;
      const ns = root.querySelector('number-slider') as Wrec;

      this.useState(state, {
        color: 'color',
        colors: 'colors',
        size: 'size'
      });
      rg.useState(state, {color: 'value', colors: 'values', labels: 'labels'});
      sl.useState(state, {color: 'value', colors: 'values', labels: 'labels'});
      ns.useState(state, {size: 'value'});
    });
  }
}

DataBinding2.define('data-binding2');
