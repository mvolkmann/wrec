import {css, html, Wrec} from '../../wrec';

class ComponentOne extends Wrec {
  static properties = {
    color: {type: String, value: 'black'},
    name: {type: String}
  };

  static css = css`
    p {
      color: this.color;
    }
  `;

  static html = html`
    <p>Enter your name below.</p>
    <labeled-input id="name" label="Name" value="this.name"></labeled-input>
  `;
}

ComponentOne.define('component-one');
