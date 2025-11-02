import {html, Wrec} from '../wrec';

class NumberBind extends Wrec {
  static properties = {
    score: {type: Number}
  };

  static html = html`
    <number-input label="Favorite Number:" value="this.score"></number-input>
    <number-slider label="Slider:" value="this.score"></number-slider>
    <p>Your score is <span>this.score</span>.</p>
  `;
}

NumberBind.register();
