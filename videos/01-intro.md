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

Then edit `index.html` and add a `name` attribute
to the `hello-world` element as follows:

```html
<hello-world name="Earth"></hello-world>
```

## Using Browser DevTools

1. Inspect the `hello-world` element.
1. Change its `name` attribute value to "Moon".
1. Switch to the Console tab.
1. Enter `$0.name` to see the current value of
   the `hello-world` component `name` property
   which is automatically kept in sync with the attribute value.
1. Enter `$0.name = "Jupiter"`.
1. Switch to the Elements tab and
   notice that the `name` attribute was updated.
