import Wreck from "../wreck.js";

class HelloWorld extends Wreck {
  static properties = {
    name: { type: String, value: "World", reflect: true },
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
