import Wrec, {css, html} from '../wrec';

const capitalize = str =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

class DataBinding extends Wrec {
  static properties = {
    color: {type: String},
    colors: {type: String, required: true},
    enableColors: {type: Boolean, value: true},
    labels: {
      type: String,
      //computed: "this.colors.split(',').map(color => this.capitalize(color)).join(',')",
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

    radio-group {
      --border-color: cornflowerblue;
      --direction: column;
      --gap: 0;
      --legend-color: blue;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;

  static html = html`
    <div>
      <label>Color Options (comma-separated):</label>
      <input value="this.colors" />
    </div>
    <div class="row">
      <label for="enableSwitch">Enable:</label>
      <toggle-switch
        id="enableSwitch"
        checked="this.enableColors"
      ></toggle-switch>
    </div>
    <radio-group
      disabled="!this.enableColors"
      name="color1"
      labels="this.labels"
      legend="Color"
      value="this.color"
      values="this.colors"
    >
      <div slot="before">Select a color for your new car.</div>
      <div slot="after">Don't choose a color you will regret.</div>
    </radio-group>
    <select-list
      disabled="!this.enableColors"
      name="color2"
      labels="this.labels"
      value="this.color"
      values="this.colors"
    ></select-list>
    <number-slider
      disabled="!this.enableColors"
      label="Size"
      max="48"
      min="12"
      value="this.size"
    ></number-slider>
    <p>You selected the color <span id="selected-color">this.color</span>.</p>
  `;

  getLabels() {
    return this.colors.split(',').map(capitalize).join(',');
  }
}

DataBinding.register();
