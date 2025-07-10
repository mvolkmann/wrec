import Wrec from "../wrec.js";

class DataBinding extends Wrec {
  //static formAssociated = true;
  static properties = {
    color: { type: String, reflect: true },
    options: { type: String, reflect: true },
    size: { type: String, reflect: true },
    sizes: { type: String, reflect: true },
  };

  html() {
    return /*html*/ `
      <div>
        <radio-group
          name="color1"
          options="this.options"
          value="this.color"
        ></radio-group>
        <hr>
        <select-list
          name="color2"
          options="this.options"
          value="this.color"
        ></select-list>
        <p>You selected the color <span>this.color</span>.</p>
        <radio-group
          name="size"
          options="this.sizes"
          value="this.size"
        ></radio-group>
        <p>You selected the size <span>this.size</span>.</p>
      </div>
    `;
  }
}

DataBinding.register();
