import {css, html, Wrec} from '../wrec';

class CssDemo extends Wrec {
  static formAssociated = true;
  static properties = {
    name: {type: String},
    value: {type: String, value: 'yellow'}
  };

  static css = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: sans-serif;
    }

    .row {
      display: flex;
      gap: 0.5rem;
    }

    #swatch {
      background-color: this.value;
      display: inline-block;
      padding: 1rem;
      width: 10rem;
    }
  `;

  static html = html`
    <div class="row">
      <label for="color-input">Color:</label>
      <input id="color-input" type="text" value="this.value" />
    </div>
    <div id="swatch">The color is <span>this.value</span>.</div>
  `;
}

CssDemo.register();
