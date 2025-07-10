import Wrec from "../wrec.js";

class DataBind extends Wrec {
  static formAssociated = true;
  static properties = {
    color: { type: String },
    name: { type: String },
    options: { type: String },
    score: { type: Number },
    story: { type: String },
  };

  static css = /*css*/ `
    :host {
      font-family: sans-serif;
    }

    label {
      font-weight: bold;
    }
  `;

  static html = /*html*/ `
    <div>
      <div>
        <label>Name:</label>
        <input value="this.name">
        <p>Hello, <span>this.name</span>!</p>
      </div>
      <div style="display: flex">
        <label for="color">Color:</label>
        <radio-group
          name="color1"
          options="this.options"
          value="this.color"
        ></radio-group>
      </div>
      <div>
        <label>Color:</label>
        <select-list
          name="color2"
          options="this.options"
          value="this.color"
        ></select-list>
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

  formResetCallback() {
    this.color = "red";
    this.name = "";
    this.score = 0;
    this.story = "";
  }
}

DataBind.register();
