import Wrec, { html } from "../wrec.js";

class MultiplyNumbers extends Wrec {
  static properties = {
    n1: { type: Number },
    n2: { type: Number },
  };

  static html = html`
    <div>
      <span>this.n1</span> * <span>this.n2</span> =
      <span>this.n1 * this.n2</span>
    </div>
  `;
}

MultiplyNumbers.register();
