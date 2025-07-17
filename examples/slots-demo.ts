import Wrec, { css, html } from "../wrec.js";

class SlotsDemo extends Wrec {
  static properties = {
    color: { type: String, value: "cornflowerblue" },
    width: { type: String, value: "20rem" },
  };
  // Typescript wants these to be explicitly declared.
  color: string;
  width: string;

  static css = css`
    :host {
      --border-radius: 1rem;
      border: 1px solid var(--color);
      border-radius: var(--border-radius);
      display: inline-block;
      font-family: sans-serif;
      width: var(--width);
    }

    .content {
      padding: 1rem;
    }

    .footer {
      background-color: var(--color);
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
      font-size: 0.7rem;
      padding: 0.25rem;
      text-align: center;
    }

    .header {
      background-color: var(--color);
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
    }
  `;

  static html = html`
    <div class="card">
      <div class="header">
        <slot name="title"></slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  `;

  connectedCallback() {
    super.connectedCallback();
    const { color, width } = this;
    this.style.setProperty("--color", color);
    this.style.setProperty("--width", width);
  }
}

SlotsDemo.register();
