# Counter component

Let's create a counter component.
This code can be found in the "my-counter" directory.

To create this project from scratch ...

- Create a new directory named "my-counter".
- cd to it.
- Create a `package.json` file by entering `npm init -y`.
- Install the wrec library by entering `npm install wrec`.
- Create the `my-counter.ts` file shown here:

  ```ts
  import {css, html, Wrec} from 'wrec';

  class MyCounter extends Wrec {
    static properties = {
      count: {type: Number, dispatch: true}
    };

    static css = css`
      button {
        background-color: lightgreen;
      }
      button:disabled {
        opacity: 0.8;
      }
    `;

    static html = html`
      <button type="button" onClick="this.count--" disabled="this.count === 0">
        -
      </button>
      <span>this.count</span>
      <button onClick="this.count++" type="button">+</button>
      <span>this.count < 10 ? "single" : "multi"</span>-digit
    `;
  }

  MyCounter.define('my-counter');
  ```

  Each property described in the `static properties` object
  has as configuration object.
  Setting `dispatch` to `true` in that object
  tells wrec to dispatch a "change" event
  every time the value of that property changes.

  Raw JavaScript expressions can appear in four places:
  the text content of an element,
  an attribute value,
  a CSS property value,
  or a `computed` configuration object property.
  The `my-counter` component only uses JavaScript expressions
  in the first two locations.

  Note the event handling on the `button` elements using `onClick` attributes.
  Any event can be handled by adding `on{event-name}` attributes.
  The event name can begin with either an uppercase or lowercase letter.

  The minus button specifies the `disabled` attribute
  with a value that is a JavaScript expression.
  That attribute will only be present in the DOM
  when the expression evaluates to `true`.

- Next, create the `index.html` file shown here:

  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <script src="./my-counter.ts" type="module"></script>
      <script type="module">
        document.body.addEventListener('change', e => {
          const {property, oldValue, value} = e.detail;
          console.log(`${property} changed from ${oldValue} to ${value}`);
        });
      </script>
    </head>
    <body>
      <my-counter count="1"></-counter>
    </body>
  </html>
  ```

  This loads the `my-counter` component and renders an instance of it.
  The `script` listens for "change" events and outputs information from them.

- Install Vite by entering `npm install -D vite`.
- Edit `package.json` and add the script "dev" that runs the command `vite`.
- Start a local server by entering `npm run dev`.
- Browse localhost:5173.
- Click the buttons and note the changes to the displayed value,
  which is prevented from becoming a negative number.
- When the value is greater than or equal to 10,
  the text at the end changes from "single-digit" to "multi-digit".
