import Wrec, { css, html } from "../wrec.js";

class CounterWrec extends Wrec {
  static properties = {
    count: { type: Number },
  };

  static css = css`
    :host {
      display: block;
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    button {
      background-color: lightgreen;
    }

    button:disabled {
      background-color: gray;
    }
  `;

  static html = html`
    <button onClick="decrement" type="button" disabled="this.count === 0">
      -
    </button>
    <span>this.count</span>
    <button onClick="this.count++" type="button">+</button>
    <span>this.count < 10 ? "single" : "double"</span> digit
  `;

  decrement() {
    if (this.count > 0) this.count--;
  }
}

CounterWrec.register();
