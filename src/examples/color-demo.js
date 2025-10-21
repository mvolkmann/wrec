import Wrec, {css, html} from '../wrec';

class ColorDemo extends Wrec {
  static properties = {
    color: {type: String},
    size: {type: Number, value: 18}
  };

  static css = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: sans-serif;
    }
    p {
      color: this.color;
      font-size: this.size + 'px';
    }
  `;

  static html = html`
    <form action="/process" method="POST">
      <color-picker
        color="this.color"
        form-assoc="red: r, green: g, blue: b"
      ></color-picker>
      <number-slider
        label="Size"
        max="48"
        min="12"
        name="size"
        value="this.size"
      ></number-slider>
      <p>This is a test.</p>
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  `;
}

ColorDemo.register();
