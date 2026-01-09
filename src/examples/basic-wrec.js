import {css, html, Wrec} from '../wrec';

class BasicWrec extends Wrec {
  static css = css`
    span {
      color: blue;
    }
  `;
  static html = html`<span>Hello, World!</span>`;
}

BasicWrec.register();
