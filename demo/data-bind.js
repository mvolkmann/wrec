import Wrec from "wrec";

class DataBind extends Wrec {
  static formAssociated = true;
  static properties = {
    color: { type: String, reflect: true },
    name: { type: String, reflect: true },
    score: { type: Number, reflect: true },
    story: { type: String, reflect: true },
  };

  css() {
    return /*css*/ `
      :host {
        font-family: sans-serif;
      }

      label {
        font-weight: bold;
      }
    `;
  }

  html() {
    return /*html*/ `
      <div>
        <div>
          <label>Name:</label>
          <input value="this.name">
          <p>Hello, <span>this.name</span>!</p>
        </div>
        <div style="display: flex">
          <label for="color">Color:</label>
          <radio-group name="color" options="red,green,blue" value="this.color"></radio-group>
        </div>
        <div>
          <label>Color:</label>
          <select value="this.color">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <p>You selected the color <span>this.color</span>.</p>
        <div>
          <label>Story:</label>
          <textarea>this.story</textarea>
          <p>Your story is <span>this.story</span>.</p>
        </div>
        <number-input label="Favorite Number:" value="this.score"></number-input>
        <number-slider label="Slider:" value="this.score"></number-slider>
        <p>Your score is <span>this.score</span>.</p>
      </div>
    `;
  }

  formResetCallback() {
    this.color = "red";
    this.name = "";
    this.score = 0;
    this.story = "";
  }
}

DataBind.register();
