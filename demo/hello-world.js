import Wrec from "../wrec.js";

class HelloWorld extends Wrec {
  static properties = {
    name: { type: String, value: "World" },
  };

  css() {
    return /*css*/ `p { color: purple; }`;
  }

  html() {
    return /*html*/ `
      <p>
        Hello, <span>this.name</span>.
        Shouting <span>this.name.toUpperCase()</span>!
      </p>
    `;
  }
}

HelloWorld.register();
