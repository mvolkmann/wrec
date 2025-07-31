import Wrec, {css, html} from './wrec.ts';

class HelloWorld extends Wrec {
  static properties = {
    name: {type: String, value: 'World'}
  };

  static css = css`
    p {
      color: purple;
    }
  `;

  static html = html`
    <p>
      Hello, <span>this.name</span>. Shouting
      <span>this.name.toUpperCase()</span>!
    </p>
  `;
}

HelloWorld.register();
