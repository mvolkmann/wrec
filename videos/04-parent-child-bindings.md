# Parent-Child 2-way Bindings

Parent elements can pass their properties to child elements.
This automatically creates 2-way bindings.
If the parent changes its property value,
the corresponding child property is updated.
If the child changes its property value,
the corresponding parent property is updated.

Let's look at an example that utilizes this.
This code can be found in the "color-demo" directory.

To create this project from scratch ...

- Create a new directory named "color-demo".
- cd to it.
- Create a `package.json` file by entering `npm init -y`.
- Install the wrec library by entering `npm i wrec`.

- Create a `number-slider.js` file shown here.
  This defines a web component the renders a `label`,
  an `input` with `type="range"`, and
  a `span` that displays the current value.

  This component is `formAssociated`
  so it can contribute values to form submissions.

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

  The `label` property specifies the text to display
  to the left of the slider.
  The `labelWidth` property supports stacking multiple instances vertically
  where their sliders all begin at the same horizontal location.
  The `min` and `max` properties constrain the allowed values of the slider,
  and the `value` property specifies its starting value.

- Create a `color-picker.js` file shown here.
  This defines a web component the renders a color swatch
  and three `number-slider` elements for selecting
  red, green, and blue values between 0 and 255.

  This component is also `formAssociated`
  so it can contribute values to form submissions.

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

  The background color of the swatch is
  determined by the `color` property value,
  which is computed based the values of
  the `red`, `green`, and `blue` properties.
  Dragging the sliders changes the values
  of the individual color properties.

- Create a `color-demo.js` file shown here.
  This defines a web component that renders a `form` containing
  a `color-picker` to select a color,
  a `number-slider` to select a font size,
  a `p` element that displays sample text, and
  buttons to submit or reset the form.
  The sample text is styled with the selected color and font size.

  ```ts
  import {css, html, Wrec} from 'wrec';
  import './color-picker';
  import './number-slider';

  class ColorDemo extends Wrec {
    static properties = {
      color: {type: String},
      disablePicker: {type: Boolean},
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
          disabled="this.disablePicker"
          form-assoc="red: r, green: g, blue: b"
        ></color-picker>
        <div>
          <label>Lock in color</label>
          <input type="checkbox" checked="this.disablePicker" />
        </div>
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

  This begins by importing the definitions of other components that it uses.

  The endpoint https://httpbin.org/post is useful for testing POST requests.
  After changing the color and size,
  click the "Submit" button to see the data that is submitted.
  We'll demo this soon.

  Note the use of the `form-assoc` attribute on the `color-picker` element
  to specify a mapping from property names to form keys.
  This is necessary for a wrec component to contribute multiple values.
  It maps the properties `red`, `green`, and `blue`
  to the form keys `r`, `g`, and `b`.
  The `form-assoc` attribute is not needed when
  a wrec component such as `number-slider`
  has a property named "value" and
  only wants to contribute that single value.
  In that case, the form key is the value of its "name" attribute,
  just like in HTML form controls.

- Create the `index.html` file shown here:

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

  This just loads the component definition and renders an instance of it.

- Install Vite by entering `npm i -D vite`.
- Edit `package.json` and add the script "dev" that runs the command `vite`.
- Start a local server by entering `npm run dev`.
- Browse localhost:5173.
- Modify the color sliders and note that the swatch and text colors update.
- Modify the size slider and note that text size updates.
- Click the Submit button and note that
  values for r, g, b, and size are submitted.

## Disabled Attribute

If the `disabled` attribute is added a custom element for a wrec component,
wrec adds that to every descendant element that can be disabled.

The component defined in `color-demo.ts`
renders a checkbox labeled "Lock in color".
Checking that causes the `disablePicker` property to be set to `true`.
That property is used to set the `disabled` attribute
on the instance of the `color-picker` component.
When that is `true`, all the sliders in the `color-picker` component
are disabled.
The `color-picker.ts` doesn't contain any code
to handle the `disabled` attribute.
Wrec handles this automatically.

- Start a local server by entering `npm run dev`.
- Browse localhost:5173.
- Modify the color sliders.
- Check the "Lock in color" checkbox.
- Note that all the color sliders are disabled,
  so the color cannot be changed.
- Uncheck the "Lock in color" checkbox.
- Note that all the color sliders are enabled,
  so the color can be changed.

## Summary

You've seen an example of utilizing two-way bindings
between parent and child components.
Think about how much additional code would be required to
implement the same functionality in any other web framework or library.
In the next video, we explore how wrec supports computed properties
and the role played by the `usedBy` property configuration property.
