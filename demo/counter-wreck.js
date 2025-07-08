import Wreck from "../Wreck.js";

class CounterWreck extends Wreck {
  static properties = {
    count: { type: Number, reflect: true },
  };

  css() {
    return /*css*/ `
      :not(:defined) {
        visibility: hidden;
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
  }

  html() {
    return /*html*/ `
    <div>
      <button onClick="decrement" type="button"
        disabled="this.count === 0">-</button>
      <span>this.count</span>
      <button onClick="this.count++" type="button">+</button>
      <span>(this.count < 10 ? "single" : "double") + " digit"</span>
    </div>
    `;
  }

  decrement() {
    if (this.count > 0) this.count--;
  }
}

CounterWreck.register();
