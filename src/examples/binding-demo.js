import {css, html, Wrec} from '../wrec';

class BindingDemo extends Wrec {
  static formAssociated = true;

  static properties = {
    moving: {type: Boolean},
    name: {type: String},
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

    traffic-light {
      margin-bottom: 0.5rem;
    }
  `;

  static html = html`
    <div class="toggle-row">
      <label>Moving:</label>
      <toggle-switch
        checked="this.moving"
        onChange="console.log('moving =', this.moving)"
      ></toggle-switch>
    </div>
    <traffic-light state="this.moving ? 'go' : 'stop'"></traffic-light>
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
  `;
}

BindingDemo.define('binding-demo');
