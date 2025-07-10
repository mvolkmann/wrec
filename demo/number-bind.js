import Wrec from "../wrec.js";

class NumberBind extends Wrec {
  static properties = {
    score: { type: Number, reflect: true },
  };

  html() {
    return /*html*/ `
      <div>
        <number-input label="Favorite Number:" value="this.score"></number-input>
        <number-slider label="Slider:" value="this.score"></number-slider>
        <p>Your score is <span>this.score</span>.</p>
      </div>
    `;
  }
}

NumberBind.register();
