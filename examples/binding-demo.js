import Wrec, {css, html} from '../wrec.js';

class BindingDemo extends Wrec {
  static formAssociated = true;
  static properties = {
    name: {type: String},
    power: {type: Boolean, value: true},
    score: {type: Number},
    speed: {type: Number, value: 0},
    story: {type: String}
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
      <input value:input="this.name" />
      <p>Hello, <span>this.name</span>!</p>
    </div>
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
    this.name = '';
    this.score = 0;
    this.story = '';
  }
}

BindingDemo.register();
