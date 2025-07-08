import Wreck from "../wreck.js";

class TemperatureEval extends Wreck {
  static properties = {
    temperature: { type: Number },
  };

  html() {
    // This web component uses conditional logic to determine what to render.
    return /*html*/ `
      <p>this.temperature < 32 ? "freezing" : "not freezing"</p>
    `;
  }
}

TemperatureEval.register();
