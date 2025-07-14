import Wrec, { css, html } from "../wrec.js";

class CounterWrec2 extends Wrec {
  static properties = {
    count: { type: Number },
  };

  static css = css`
    :host {
      display: block;
    }

    button {
      background-color: lightgreen;
    }

    button:disabled {
      background-color: gray;
    }
  `;

  static html = html`
    <button onClick="this.count--" type="button" disabled="this.count === 0">
      -
    </button>
    <span>this.count</span>
    <button onClick="this.count++" type="button">+</button>
    <span>this.count < 10 ? "single" : "double"</span> digit
  `;
}

CounterWrec2.register();
