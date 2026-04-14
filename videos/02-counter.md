# Counter component

For all the examples going forward,
we will assume you have Bun installed.
If not, you can either install it or
use vite as shown in the introduction video.

Let's create a counter component.

- Create a new directory named "my-counter".
- cd to it.
- Create a `package.json` file by entering `npm init -y`.
- Install the wrec library by entering `npm i wrec`.
- Create a `my-counter.js` file containing the following:

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

  Raw JavaScript expressions can appear in
  the text content of an element,
  an attribute value,
  a CSS property value,
  or a `computed` configuration object property.
  This component only uses JavaScript expressions in the first two places.

- Create an `index.html` file containing the following:

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

  The `script` listens for "change" events and outputs information from them.

- Start a local server by entering `bun index.html`.
- Browse localhost:3000.
