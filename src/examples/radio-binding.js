import {html, Wrec} from '../wrec';

class RadioBinding extends Wrec {
  static properties = {
    choice: {type: String, value: 'green'}
  };

  static html = html`
    <label>
      <input id="red" checked="this.choice" name="choice" type="radio" value="red" />
      Red
    </label>
    <label>
      <input
        id="green"
        checked="this.choice"
        name="choice"
        type="radio"
        value="green"
      />
      Green
    </label>
    <p id="status">this.choice</p>
  `;
}

RadioBinding.define('radio-binding');
