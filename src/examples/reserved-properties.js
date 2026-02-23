import {html, Wrec} from '../wrec';

class ReservedProperties extends Wrec {
  static properties = {
    class: {type: String},
    style: {type: String}
  };
  static html = html`<span>Hello, World!</span>`;
}

ReservedProperties.define('reserved-properties');
