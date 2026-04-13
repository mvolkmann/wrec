import {css, html, Wrec} from 'wrec';

class {class} extends Wrec {
  static properties = {
    name: {type: String, value: 'World'},
  };

  static css = css`
    p {
      color: blue;
      font-family: fantasy;
    }
  `;

  static html = html`
    <p>Hello, <span>this.name</span>!</p>
  `;
}

{class}.define('{tag}');
