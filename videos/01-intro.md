# Introduction

wrec is a library that simplifies creating web components.
It is an alternative to libraries like Lit, Stencil, and FAST.
wrec emphasizes simplicity and reactivity with targeted DOM updates.

With each example shown in this video series,
I challenge you to find a web UI library
that can recreate it with less code.

## Basic Hello World

Let's start simple.

- Create a new directory named "hello-world".
- cd to it.
- Create a `package.json` file by entering `npm init -y`.
- Install the wrec library by entering `npm i wrec`.
- Create a `hello-world.js` file containing the following:

  ```js
  import {html, Wrec} from 'wrec';

  class HelloWorld extends Wrec {
    static html = html`<p>Hello, World!</p>`;
  }

  HelloWorld.define('hello-world');
  ```

  Wrec components are defined by a class that extends `Wrec`
  and defines the `static html` property.

  The call to `HelloWorld.define` associates
  the `HelloWorld` class with the `hello-world` tag name.

- Create an `index.html` file containing the following:

  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <script src="hello-world.js" type="module"></script>
    </head>
    <body>
      <hello-world></hello-world>
    </body>
  </html>
  ```

- Install Vite by entering `npm i -D vite`.
- Edit `package.json` and add the script `"dev": "vite"`.
- Start a local server by entering `npm run dev`.
- Browse localhost:5173.

## Better Hello World

Our `hello-world` component is boring.
It has no styling and always renders the same thing.
Let's fix that by modifying `hello-world.js` to contain the following:

```js
import {css, html, Wrec} from 'wrec';

class HelloWorld extends Wrec {
  static properties = {
    name: {type: String, value: 'World'}
  };
  static css = css`
    p {
      color: blue;
      font-family: fantasy;
    }
  `;
  static html = html`<p>Hello, <span>this.name</span>!</p>`;
}

HelloWorld.define('hello-world');
```

The `static properties` property defines the component properties
where each has a configuration object.
The only required property in configuration objects is `type`,
which must be set to one of these runtime type constructors:
`Boolean`, `Number`, `String`, `Object`, or `Array`.

The `value` property specifies the default value
to use if no value is supplied.

Other supported configuration properties include:

- `dispatch`: When set to `true`, a `change` event
  is dispatched every time the property value changes.
  The `detail` property in the event objects contains the properties
  `tagName`, `property`, `oldValue`, and `value`.

- `required`: When set to `true`, a `WrecError`
  is thrown when a custom element for the component
  does not specify the corresponding attribute.

- `usedBy`: This is an array of strings that lists
  the methods that use the property.
  Its use is explained in the "Scripts" video.

- `values`: This is a string containing
  a comma-separated list of allowed values
  that can only be specified for properties with `type: String`,
  similar to an enumerated type.
  For example, "red,green,blue".

The `static css` property value is template literal
containing CSS rules that are scoped to the component.

Note the raw JavaScript expression inside the `span` element.
That is automatically replaced by the expression value
every time the value changes
using an efficient, targeted DOM update.

Then edit `index.html` and add a `name` attribute
to the `hello-world` element as follows:

```html
<hello-world name="Earth"></hello-world>
```

## Two-way Bindings Demonstrated with Browser DevTools

1. Inspect the `hello-world` element.
1. Change its `name` attribute value to "Moon"
   and notice that the DOM is updated.
1. Switch to the Console tab.
1. Enter `$0.name` to see the current value of
   the `hello-world` component `name` property
   which is automatically kept in sync with the attribute value.
1. Enter `$0.name = "Jupiter"`
   and notice that the DOM is updated.
1. Switch to the Elements tab and
   notice that the `name` attribute is also updated.
