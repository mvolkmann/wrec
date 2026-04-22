# Computed Properties

Component properties can be configured to be computed.
You saw an example of this in the `color-picker` component.

Let's look at another example and review some options.
This code can be found in the "rectangle-area" directory.

- Create a new directory named "rectangle-area".
- cd to it.
- Create a `package.json` file by entering `npm init -y`.
- Install the wrec library by entering `npm i wrec`.
- Copy `number-slider.ts` from the `color-demo` project.
- Create a `rectangle-area.ts` file containing the following:

  ```js
  import {css, html, Wrec} from 'wrec';
  import './number-slider.ts';

  class RectangleArea extends Wrec {
    static properties = {
      width: {type: Number, value: 10},
      height: {type: Number, value: 5}
    };

    static css = css`
      .area {
        font-weight: bold;
      }
    `;

    static html = html`
      <number-slider label="Width:" value="this.width"></number-slider>
      <number-slider label="Height:" value="this.height"></number-slider>
      <div class="area">Area: <span>this.width * this.height</span></div>
    `;
  }

  RectangleArea.define('rectangle-area');
  ```

  The `span` element inside the `div` element
  displays the result of multiplying the `width` and `height` properties.
  It is updated automatically whenever either property value changes.

- Create an `index.html` file containing the following:

  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <script src="rectangle-area.js" type="module"></script>
    </head>
    <body>
      <rectangle-area></rectangle-area>
    </body>
  </html>
  ```

  This just loads the component definition and renders an instance.

- Install Vite by entering `npm i -D vite`.
- Edit `package.json` and add the script `"dev": "vite"`.
- Start a local server by entering `npm run dev`.
- Browse localhost:5173.
- Drag the width and length sliders to change their values.
- Note that the area is updated.

This works great, but there are other ways we can compute the area.
To use a computed property:

- Add the following property in the `static properties` object:

  ```ts
  area: {type: Number, computed: 'this.width * this.height'}
  ```

- After "Area:", change the `span` element content to `this.area`.

The component works the same as before.

You can also add a method to computed the area.
There's little reason to do it in this example,
but you can imagine a more complicated calculation
where this may be desired.

- Add the following method:

  ```ts
  getArea() {
    return this.width * this.height;
  }
  ```

- Either remove the `area` property and
  change the `span` content to `this.getArea()`
  OR
  change the `computed` property in the `area` property configuration
  to `this.getArea()`.

But now we have an issue. How can wrec know
when to call that method again to get an updated value?
The answer is that we need to tell wrec that the `width` and `height`
properties are used by the `getArea` method.
To do this, change `static properties` to the following:

```ts
  static properties = {
    width: { type: Number, value: 10, usedBy: "getArea" },
    height: { type: Number, value: 5, usedBy: "getArea" },
  };
```

You'll see in the "Scripts" video that wrec provides
a way to fill in the `usedBy` properties for you.
