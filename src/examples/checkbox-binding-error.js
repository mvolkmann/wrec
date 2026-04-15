import {html, Wrec} from '../wrec';

class CheckboxBindingError extends Wrec {
  static properties = {
    label: {type: String, value: 'bad'}
  };

  static html = html`
    <input type="checkbox" checked="this.label" />
  `;
}

CheckboxBindingError.define('checkbox-binding-error');
