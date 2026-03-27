import {css, html, Wrec} from '../wrec';

class HelloWorld extends Wrec {
  static properties = {
    color: {type: String, value: 'blue'},
    name: {type: String, value: 'World'},
    title: {type: String, value: ''}
  };

  static css = css`
    p {
      color: this.color;
    }
  `;

  static html = html`
    <p title="this.title">Hello, <span>this.name</span>!</p>
  `;
}

HelloWorld.define('hello-world');

// This is exported for use in tests/ssr.spec.ts.
export default HelloWorld;
