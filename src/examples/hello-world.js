import {css, html, Wrec} from '../wrec';

class HelloWorld extends Wrec {
  static properties = {
    name: {type: String, value: 'World'}
  };

  static css = css`
    p {
      color: purple;
    }
  `;

  static html = html` <p>Hello, <span>this.name</span>!</p> `;
}

HelloWorld.define('hello-world');

// This is exported for use in tests/ssr.spec.ts.
export default HelloWorld;
