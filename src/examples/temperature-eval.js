import {html, Wrec} from '../wrec';

class TemperatureEval extends Wrec {
  static properties = {
    temperature: {type: Number}
  };

  static html = html`
    <p>this.temperature < 32 ? "freezing" : "not freezing"</p>
  `;
}

TemperatureEval.register();
