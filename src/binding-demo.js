import Wrec, {css, html} from './wrec';

class BindingDemo extends Wrec {
  static formAssociated = true;
  static properties = {
    name: {type: String},
    power: {type: Boolean},
    score: {type: Number},
    speed: {type: Number},
    story: {type: String}
  };

  static css = css`
    :host {
      font-family: sans-serif;
    }

    label {
      font-weight: bold;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
  `;

  static html = html`
    <div class="toggle-row">
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
    <number-input label="Score:" value="this.score"></number-input>
    <number-slider label="Score:" value="this.score"></number-slider>
    <p id="score-p">Your score is <span>this.score</span>.</p>
  `;

  formResetCallback() {
    this.name = '';
    this.score = 0;
    this.story = '';
  }
}

BindingDemo.register();
