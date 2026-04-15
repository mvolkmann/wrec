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

- Create a `number-slider.js` file containing the following.
  This defines a web component the renders a `label`,
  an `input` with `type="range"`, and
  a `span` that displays the current value.

  This component is `formAssociated` so it can
  contribute values to form submissions.

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

- Create a `color-picker.js` file containing the following.
  This defines a web component the renders a color swatch
  and three `number-slider` elements for selecting
  red, green, and blue values between 0 and 255.
  The swatch is updated to the specified RGB value
  as the sliders are dragged.
  Note that the `color` property is computed from the
  `red`, `green`, and `blue` properties.

  This component is `formAssociated` so it can
  contribute values to form submissions.

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

- Create a `color-demo.js` file containing the following.
  This defines a web component the renders a `form`
  that contains a `color-picker`,
  a `number-slider` to select a font size,
  a `p` element that displays sample text, and
  buttons to submit or reset the form.
  The sample text is styled with the selected color and font size.

  The endpoint https://httpbin.org/post is useful for testing POST requests.

  Note the use of the `form-assoc` attribute on the `color-picker` element
  to specify mapping from property names to form keys.
  This is necessary when a wrec component contributes multiple values.
  It is not needed when a wrec component such as `number-slider`
  has a property named "value" and only contributes that single value.
  In that case, the form key is the value of its "name" attribute.

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
  values for r, g, b, and size are submitted.

## Disabled Attribute

If the `disabled` attribute is added a custom element for a wrec component,
wrec adds that to every descendant element that can be disabled.

For example, you can add a checkbox in the `color-demo` component
that causes all the sliders in the `color-picker` component
to be disabled when clicked.

To do this:

- Add the following property in `static properties`:

  ```ts
  disablePicker: { type: Boolean },
  ```

- Add the following in the `html` template literal:

  ```ts
  <div>
    <label>Disable Picker</label>
    <input
      type="checkbox"
      checked="this.disablePicker"
      onChange="this.disablePicker = !this.disablePicker"
    />
  </div>
  ```

- Add the following attribute to the `color-picker` element
  in the `html` template literal:

  ```html
  disabled="this.disablePicker"
  ```
