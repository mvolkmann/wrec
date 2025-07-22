import Wrec, { css, html } from "../wrec.js";

class BasicWrec extends Wrec {
  static css = css`
    span {
      font-family: fantasy;
    }
  `;
  static html = html`<span>Hello, World!</span>`;
}

BasicWrec.register();
