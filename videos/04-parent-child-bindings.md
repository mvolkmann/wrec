# Parent-Child 2-way Bindings

Parent elements can pass their properties to child elements.
This automatically creates 2-way bindings.
If the parent changes its property value,
the corresponding child property is updated.
If the child changes its property value,
the corresponding parent property is updated.

Let's look at an example that utilizes this.

- Create a new directory named "color-demo".
- cd to it.
- Create a `package.json` file by entering `npm init -y`.
- Install the wrec library by entering `npm i wrec`.
- Create a `number-slider.js` file containing the following:

  ```ts
  import {css, html, Wrec} from 'wrec';

  class NumberSlider extends Wrec {
    static formAssociated = true;

    static properties = {
      label: {type: String},
      labelWidth: {type: String},
      max: {type: Number, value: 100},
      min: {type: Number, value: 0},
      value: {type: Number}
    };

    static css = css`
      :host {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      input[type='range'] {
        width: 7rem;
      }
      label {
        font-weight: bold;
        text-align: right;
        width: this.labelWidth;
      }
    `;

    static html = html`
      <label>this.label</label>
      <input
        type="range"
        min="this.min"
        max="this.max"
        value:input="this.value"
      />
      <span>this.value</span>
    `;
  }

  NumberSlider.define('number-slider');
  ```

- Create a `color-picker.js` file containing the following:

  ```ts
  import {css, html, Wrec} from 'wrec';
  import './number-slider';

  class ColorPicker extends Wrec {
    static formAssociated = true;

    static properties = {
      labelWidth: {type: String, value: '3rem'},
      red: {type: Number},
      green: {type: Number},
      blue: {type: Number},
      color: {
        type: String,
        computed: '`rgb(${this.red}, ${this.green}, ${this.blue})`'
      }
    };

    static css = css`
      :host {
        display: flex;
        gap: 0.5rem;
      }
      #sliders {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      #swatch {
        background-color: this.color;
        height: 5rem;
        width: 5rem;
      }
    `;

    static html = html`
      <div id="swatch"></div>
      <div id="sliders">
        <!-- prettier-ignore -->
        ${this.makeSlider('Red')}
        ${this.makeSlider('Green')}
        ${this.makeSlider('Blue')}
      </div>
    `;

    static makeSlider(label: string) {
      return html`
        <number-slider
          label=${label}
          label-width="this.labelWidth"
          max="255"
          value="this.${label.toLowerCase()}"
        ></number-slider>
      `;
    }
  }

  ColorPicker.define('color-picker');
  ```

- Create a `color-demo.js` file containing the following:

  ```ts
  import {css, html, Wrec} from 'wrec';
  import './color-picker';
  import './number-slider';

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
      number-slider {
        margin-top: 1rem;
      }
      p {
        color: this.color;
        font-size: this.size + 'px';
      }
    `;

    static html = html`
      <form method="post" action="https://httpbin.org/post">
        <color-picker
          color="this.color"
          form-assoc="red: r, green: g, blue: b"
        ></color-picker>
        <number-slider
          label="Size"
          max="48"
          min="12"
          value="this.size"
          name="size"
        ></number-slider>
        <p>This is a test.</p>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    `;
  }

  ColorDemo.define('color-demo');
  ```

- Create an `index.html` file containing the following:

  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <script src="color-demo.js" type="module"></script>
    </head>
    <body>
      <color-demo></color-demo>
    </body>
  </html>
  ```

- Install Vite by entering `npm i -D vite`.
- Edit `package.json` and add the script `"dev": "vite"`.
- Start a local server by entering `npm run dev`.
- Browse localhost:5173.
- Modify the color sliders and note that the swatch and text colors update.
- Modify the size slider and note that text size updates.
- Click the Submit button and note that
  the values for r, g, b, and size are submitted.
