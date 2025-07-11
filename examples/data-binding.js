import Wrec, { html } from "../wrec.js";

class DataBinding extends Wrec {
  //static formAssociated = true;
  static properties = {
    color: { type: String },
    options: { type: String },
    size: { type: String },
    sizes: { type: String },
  };

  static html = html`
    <div>
      <radio-group
        name="color1"
        options="this.options"
        value="this.color"
      ></radio-group>
      <hr />
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

DataBinding.register();
