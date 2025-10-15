import Wrec, {html} from '../../wrec';

class ComponentTwo extends Wrec {
  static properties = {
    color: {type: String, value: 'black'},
    name: {type: String}
  };

  static html = html`
    <p>Hello, <span>this.name</span>!</p>
    <color-picker color="this.color"></color-picker>
  `;
}

ComponentTwo.register();
