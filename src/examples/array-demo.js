import Wrec, {html} from '../wrec';

class ArrayDemo extends Wrec {
  static properties = {
    items: {type: Array}
  };

  static html = html`
    <h1>Array</h1>
    <p>count = <span>this.items.length</span></p>
    <div>this.items.map(this.makeDiv)</div>
  `;

  makeDiv(item) {
    return html`<div>${item.name}</div>`;
  }
}

ArrayDemo.register();
