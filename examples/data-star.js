import Wrec, { css, html } from "../wrec.js";

// This demonstrates how wrec can implement
// some features I saw in a demo of data-star.
class DataStar extends Wrec {
  static properties = {
    username: { type: String },
  };

  static css = css`
    .hide {
      display: none;
    }
  `;

  static html = html`
    <input value="this.username" />
    <div>My name is <span>this.username.toUpperCase()</span>.</div>
    <div>length = <span>this.username.length</span></div>
    <button class="this.username.length > 2 ? '' : 'hide'">Save</button>
  `;
}

DataStar.register();
