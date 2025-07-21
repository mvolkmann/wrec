import Wrec, { css, html } from "../wrec.js";

class BindingDemo extends Wrec {
  static formAssociated = true;
  static properties = {
    color: { type: String },
    colors: { type: String },
    name: { type: String },
    power: { type: Boolean, value: true },
    score: { type: Number },
    speed: { type: Number, value: 0 },
    story: { type: String },
  };

  static css = css`
    :host {
      font-family: sans-serif;
    }

    label {
      font-weight: bold;
    }
  `;

  static html = html`
    <div>
      <label>Power:</label>
      <toggle-switch
        checked="this.power"
        onChange="console.log('binding-demo.js: power =', this.power)"
      ></toggle-switch>
    </div>
    <stop-light go="this.speed < 10"></stop-light>
    <div id="input-demo">
      <label>Name:</label>
      <input value="this.name" />
      <p>Hello, <span>this.name</span>!</p>
    </div>
    <div style="display: flex">
      <label for="color">Color:</label>
      <radio-group
        name="color1"
        value="this.color"
        values="this.colors"
      ></radio-group>
    </div>
    <div>
      <label>Color:</label>
      <select-list
        name="color2"
        value="this.color"
        values="this.colors"
      ></select-list>
    </div>
    <p id="selected-color">You selected the color <span>this.color</span>.</p>
    <div id="textarea-demo">
      <label>Story:</label>
      <textarea>this.story</textarea>
      <p>Your story is <span>this.story</span>.</p>
    </div>
    <number-input label="Favorite Number:" value="this.score"></number-input>
    <number-slider label="Slider:" value="this.score"></number-slider>
    <p id="score-p">Your score is <span>this.score</span>.</p>
  `;

  formResetCallback() {
    this.color = "red";
    this.name = "";
    this.score = 0;
    this.story = "";
  }
}

BindingDemo.register();
