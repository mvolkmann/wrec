import Wrec from "../wrec.js";

// This demonstrates how wrec can implement
// some features I saw in a demo of data-star.
class DataStar extends Wrec {
  static properties = {
    username: { type: String },
  };

  css() {
    return /*css*/ `
      .hide {
        display: none;
      }
    `;
  }

  html() {
    return /*html*/ `
      <div>
        <input value="this.username">
        <div>My name is <span>this.username.toUpperCase()</span>.</div>
        <div>length = <span>this.username.length</span></div>
        <button class="this.username.length > 2 ? '' : 'hide'">
          Save
        </button>
      </div>
    `;
  }
}

DataStar.register();
