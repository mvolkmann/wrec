import Wreck from "../wreck.js";

class MultiplyNumbers extends Wreck {
  static properties = {
    n1: { type: Number },
    n2: { type: Number },
  };

  html() {
    return /*html*/ `
      <p>
        <span>this.n1</span> * <span>this.n2</span> =
        <span>this.n1 * this.n2</span>
      </p>
    `;
  }
}

MultiplyNumbers.register();
