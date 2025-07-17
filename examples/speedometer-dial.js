import Wrec, { css, html } from "../wrec.js";

class SpeedometerDial extends Wrec {
  static properties = {
    min: { type: Number, value: 0 },
    max: { type: Number, value: 100 },
    value: { type: Number },
  };

  connectedCallback() {
    // Set value to min if no value attribute is provided
    if (!this.hasAttribute("value")) {
      this.value = this.min;
    }
    super.connectedCallback();
  }

  static css = css`
    :host {
      display: inline-block;
      width: 200px;
      height: 200px;
    }

    .speedometer {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, #333 0%, #555 100%);
      position: relative;
      border: 4px solid #222;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .dial-face {
      width: 90%;
      height: 90%;
      border-radius: 50%;
      background: linear-gradient(135deg, #444 0%, #666 100%);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid #555;
    }

    .needle {
      width: 2px;
      height: 45%;
      background: linear-gradient(to bottom, #ff0000 0%, #cc0000 100%);
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: bottom center;
      transform: translate(-50%, -100%)
        rotate(
          calc(
            ((this.value - this.min) / (this.max - this.min)) * 180deg - 90deg
          )
        );
      border-radius: 1px;
      box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);
      z-index: 3;
    }

    .center-dot {
      width: 10px;
      height: 10px;
      background: #333;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 4;
      border: 1px solid #666;
    }

    .tick {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center;
      height: 1px;
      width: 20px;
      background: #ccc;
      z-index: 2;
    }

    .tick:nth-child(1) {
      transform: translate(-50%, -50%) rotate(-90deg) translateX(-40px);
    }
    .tick:nth-child(2) {
      transform: translate(-50%, -50%) rotate(-45deg) translateX(-40px);
    }
    .tick:nth-child(3) {
      transform: translate(-50%, -50%) rotate(0deg) translateX(-40px);
    }
    .tick:nth-child(4) {
      transform: translate(-50%, -50%) rotate(45deg) translateX(-40px);
    }
    .tick:nth-child(5) {
      transform: translate(-50%, -50%) rotate(90deg) translateX(-40px);
    }

    .value-display {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-family: "Courier New", monospace;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.7);
      padding: 4px 8px;
      border-radius: 4px;
      z-index: 5;
    }
  `;

  static html = html`
    <div class="speedometer">
      <div class="dial-face">
        <div class="tick"></div>
        <div class="tick"></div>
        <div class="tick"></div>
        <div class="tick"></div>
        <div class="tick"></div>
        <div class="needle"></div>
        <div class="center-dot"></div>
      </div>
      <div class="value-display">this.value</div>
    </div>
  `;
}

SpeedometerDial.register();
