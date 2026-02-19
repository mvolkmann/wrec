import {css, html, Wrec} from '../wrec';

class StopLight extends Wrec {
  static properties = {
    go: {type: Boolean},
    speed: {type: Number}
  };

  static css = css`
    div {
      border-radius: 50%;
      height: 2rem;
      width: 2rem;
    }
    .go {
      background-color: green;
    }
    .stop {
      background-color: red;
    }
  `;

  static html = html`<div class="this.go ? 'go' : 'stop'"></div>`;
}

StopLight.define('stop-light');
