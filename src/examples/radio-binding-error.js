import {html, Wrec} from '../wrec';

class RadioBindingError extends Wrec {
  static properties = {
    enabled: {type: Boolean, value: true}
  };

  static html = html`
    <input checked="this.enabled" type="radio" value="yes" />
  `;
}

RadioBindingError.define('radio-binding-error');
