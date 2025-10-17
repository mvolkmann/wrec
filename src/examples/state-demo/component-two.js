import Wrec, {html} from '../../wrec';

class ComponentTwo extends Wrec {
  static properties = {
    color: {type: String, value: 'red'},
    name: {type: String}
  };

  static html = html`
    <p>Hello, <span>this.name</span>!</p>
    <radio-group
      labels="Red,Green,Blue"
      legend="Color"
      value="this.color"
      values="red,green,blue"
    ></radio-group>
  `;
}

ComponentTwo.register();
