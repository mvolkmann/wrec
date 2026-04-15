import {html, Wrec} from '../wrec';

class CheckboxBinding extends Wrec {
  static properties = {
    moving: {type: Boolean, value: true}
  };

  static html = html`
    <label>
      <input id="moving" type="checkbox" checked="this.moving" />
      Moving
    </label>
    <p id="status">this.moving ? 'moving' : 'stopped'</p>
  `;
}

CheckboxBinding.define('checkbox-binding');
