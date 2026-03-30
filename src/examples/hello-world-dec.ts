import {css, html, property, WrecD} from '../wrecd';

class HelloWorldD extends WrecD {
  @property()
  color: string = 'blue';

  @property()
  name: string = 'World';

  @property()
  title: string = '';

  static css = css`
    p {
      color: this.color;
    }
  `;

  static html = html`
    <p title="this.title">Hello, <span>this.name</span>!</p>
  `;
}

HelloWorldD.define('hello-world-d');

// This is exported for use in tests/ssr.spec.ts.
export default HelloWorldD;
