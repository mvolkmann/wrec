import {css, html, Wrec} from '../wrec';

class ReactiveCSS extends Wrec {
  static properties = {
    size: {type: Number, value: 18}
  };

  static css = css`
    p {
      font-size: this.size + 'px';
    }
  `;

  static html = html`
    <input type="range" value:input="this.size" />
    <p>My size is reactive!</p>
  `;
}

ReactiveCSS.register();
