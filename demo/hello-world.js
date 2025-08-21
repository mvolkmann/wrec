import Wrec, {css, html} from './wrec.min.js';

class HelloWorld extends Wrec {
  static properties = {
    name: {type: String, value: 'World'}
  };

  static css = css`
    :host {
      font-family: fantasy;
    }
  `;

  static html = html`<p>Hello, <span>this.name</span>!</p>`;
}

HelloWorld.register();
