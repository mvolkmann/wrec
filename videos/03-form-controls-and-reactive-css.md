# Form Controls and Reactive CSS

Wrec can create 2-way bindings between
form control values and component properties.
Form controls that have values include
`input`, `textarea`, and `select` elements.

Let's create a component that demonstrates this.
This code can be found in the "form-controls" directory.

- Create a new directory named "form-controls".
- cd to it.
- Create a `package.json` file by entering `npm init -y`.
- Install the wrec library by entering `npm i wrec`.
- Create a `form-controls.ts` file containing the following:

  ```ts
  import {css, html, Wrec} from 'wrec';

  class FormControls extends Wrec {
    static properties = {
      color: {type: String, value: 'red'},
      size: {type: Number, value: 18},
      story: {type: String, value: 'Once upon a time...'}
    };

    static css = css`
      :host {
        /* styles the custom element */
        display: flex;
        flex-direction: column;
        gap: 1rem;

        border: 1px solid gray;
        font-family: sans-serif;
        padding: 1rem;
        width: 20rem;
      }
      label {
        font-weight: bold;
      }
      p {
        color: this.color;
        /* reactive CSS */
        font-size: this.size + 'px';
        margin: 0;
      }
      .row {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        input,
        textarea {
          flex-grow: 1;
        }
      }
    `;

    static html = html`
      <div class="row">
        <label>Story</label>
        <textarea>this.story</textarea>
      </div>
      <div class="row">
        <label>Size</label>
        <input type="range" min="8" max="48" value:input="this.size" />
        <span>this.size</span> px
      </div>
      <div class="row">
        <label>Color</label>
        <select value="this.color">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </div>
      <p>this.story</p>
    `;
  }

  FormControls.define('form-controls');
  ```

  Note the JavaScript expressions that are just property references in:
  - the CSS for `p` elements,
  - the `textarea` element content
  - the `input` element `value` attribute
  - the `select` element `value` attribute

  When the user changes the value of one of the form controls,
  the referenced property is updated.
  For example, changing the `input` value changes the `size` property,
  which is used in the `font-size` CSS property of `p` elements.

  Wrec remembers the location of each of these expressions,
  and the properties they use.
  When the value of a property used by an expression changes,
  the expression is recomputed and all affected locations are updated.
  These targeted DOM updates are far more efficient than
  complete re-renders or strategies like a virtual DOM.

  By default, wrec updates the property specified in
  an `input` element `value` attribute when it receives a change event.
  Those are dispatched when the value is committed,
  which happens when focus leaves the `input` or
  when the user presses the return key.
  To instead have wrec update the property on every value change,
  such as dragging the slider in an `input` with `type="range"`,
  we added ":input" after the "value" attribute name.

- Create an `index.html` file containing the following:

  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <script src="./form-controls.ts" type="module"></script>
    </head>
    <body>
      <form-controls></form-controls>
    </body>
  </html>
  ```

  This just loads the component definition and renders an instance.

- Install Vite by entering `npm i -D vite`.
- Edit `package.json` and add the script `"dev": "vite"`.
- Start a local server by entering `npm run dev`.
- Browse localhost:5173.
- Change the Story text, the Size slider, and the Color dropdown.
- Note that the `p` element automatically updates.

For `input` elements with `type="checkbox"`,
the `checked` attribute can be set to a reference to a Boolean property.
That creates a two-way binding where
clicking the checkbox updates the property and
changing the property updates the checkbox.
You will see an example of this in the "Parent-Child Bindings" video.

For `input` elements with `type="radio"`,
the `checked` attribute can be set to a reference to a String property.
That creates a two-way binding where clicking the radio button
sets the property to the value of the `value` attribute and
changing the property updates the `checked` value based on
whether the property value matches the value of the `value` attribute.
