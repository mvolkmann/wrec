# Introduction

Welcome to my video series on the wrec library
that simplifies creating web components.
It's an alternative to libraries like Lit, Stencil, and FAST.
wrec emphasizes simplicity and reactivity with targeted DOM updates.

With each example shown in this video series,
I challenge you to find a web UI library
that can recreate it with less code.

All the example code from the videos can be found in the
"ch09" directory inside the GitHub repository linked in the comments.

[web-component-book-code](https://github.com/mvolkmann/web-component-book-code)

## Basic Hello World

Let's start simple.
This code can be found in the "hello-world" directory.
To create this project from scratch ...

- Create a new directory named "hello-world".
- cd to it.
- Create a `package.json` file by entering `npm init -y`.
- Install the wrec library by entering `npm install wrec`.
- Create the `hello-world.js` file shown here:

  ```js
  import {html, Wrec} from 'wrec';

  class HelloWorld extends Wrec {
    static html = html`<p>Hello, World!</p>`;
  }

  HelloWorld.define('hello-world');
  ```

  Wrec components are defined by a class that extends `Wrec`.
  The class must define a `static html` property whose value is
  a template literal that uses the `html` tag function.

  The call to `HelloWorld.define` associates
  the `HelloWorld` class with the `hello-world` tag name.

- Create the `index.html` file shown here:

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

  This just loads the component definition and renders an instance of it.

- Install Vite as a dev dependency by entering `npm install -D vite`.
- Edit `package.json` and add the script "dev" that runs the command `vite`.
- Start a local server by entering `npm run dev`.
- Browse localhost:5173 to see what is shown here.

## Better Hello World

Our `hello-world` component is boring.
It has no styling and always renders the same thing.
Let's fix that by modifying `hello-world.js`
to contain the code shown here:

```js
import {css, html, Wrec} from 'wrec';

class HelloWorld extends Wrec {
  static properties = {
    name: {type: String, value: 'World'}
  };
  static css = css`
    p {
      color: blue;
    }
  `;
  static html = html`<p>Hello, <span>this.name</span>!</p>`;
}

HelloWorld.define('hello-world');
```

The `static properties` property defines the component properties
where each has a configuration object.
The only required property in these configuration objects is `type`,
which must be set to one of the these runtime type constructors:
`Boolean`, `Number`, `String`, `Object`, `Array`, or `HTMLElement`.

The `value` property specifies the default property value
to use if a custom element doesn't specify
a value for the corresponding attribute.

Other supported configuration properties include the following:

- When the `dispatch` property is set to `true`, a `change` event
  is dispatched every time the property value changes.
  Code outside the component can listen for those events.
  The event objects contain a `detail` property
  whose value is an object that contains the properties
  `tagName`, `property`, `oldValue`, and `value`.
  This is demonstrated in the "Counter" video,
  which is the next in the series.

- When the `required` property is set to `true`,
  a `WrecError` is thrown when a custom element for the component
  does not specify the corresponding attribute.

- The `usedBy` property must be set to a string or an array of strings
  that identify the methods that use the property.
  Its use is explained later in the "Scripts" video.

- The `values` property is a string containing
  a comma-separated list of allowed values.
  It can only be specified for properties where
  the `type` property is set to `String`.
  This makes the property similar to an enumerated type.
  For example, specifying the string "red,green,blue"
  requires the property to have one of those values.

The `static css` property value is a
template literal that uses the `css` tag function.
It contains CSS rules that are scoped to the component.

Note the raw JavaScript expression inside the `span` element.
That is automatically replaced by the expression value
every time its value changes,
using an efficient, targeted DOM update.

Edit `index.html` and add another instance of the `hello-world` custom element
that includes a `name` attribute as follows:

```html
<hello-world name="Earth"></hello-world>
```

This will of course render "Hello, Earth!" instead of "Hello, World!".
The existing `hello-world` custom element
will continue to use "World" for the name.

Let's demonstrate wrec's support for two-way bindings.

1. Inspect the `hello-world` element.
1. Change its `name` attribute value to "Moon"
   and notice that the DOM is updated.
1. Switch to the Console tab.
1. Enter `$0.name` to see the current value of
   the `hello-world` component `name` property
   which is automatically kept in sync with the attribute value.
1. Change the `name` property by entering `$0.name = "Jupiter"`
   and notice that the DOM is updated.
1. Switch to the Elements tab and
   notice that the `name` attribute is also updated.
