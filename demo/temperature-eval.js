import Wrec from "../wrec.js";

class TemperatureEval extends Wrec {
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
