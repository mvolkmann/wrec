import {css, html, Wrec} from '../wrec';

class NumberBind extends Wrec {
  static properties = {
    score: {type: Number}
  };

  static css = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: sans-serif;
    }
    p {
      margin: 0;
    }
  `;

  static html = html`
    <number-input label="Favorite Number:" value="this.score"></number-input>
    <number-slider label="Slider:" value="this.score"></number-slider>
    <p>Your score is <span>this.score</span>.</p>
  `;
}

NumberBind.register();
