import {html, Wrec} from '../wrec';

class RefDemo extends Wrec {
  static properties = {
    inputRef: {type: HTMLElement}
  };

  static html = html`
    <input ref="inputRef" value="wired" />
    <p>ready</p>
  `;

  async connectedCallback() {
    await super.connectedCallback();
    this.inputRef.setAttribute('data-ref-ready', 'true');
  }
}

RefDemo.define('ref-demo');
