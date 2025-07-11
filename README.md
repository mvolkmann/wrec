# Web Reactive Component (wrec)

<img alt="shipwreck" src="shipwreck.png" style="width: 256px">

Wrec is a small, zero dependency library that
greatly simplifies building web components.
It was inspired by [Lit](https://lit.dev).

Wrec has fewer features than Lit.
In exchange, Wrec:

- is much smaller than Lit (about 1/4 of the size)
- doesn't require any tooling
- doesn't require a build process

The main features of Wrec are that it automates
wiring event listeners and implementing reactivity.

## Getting Started

Let's use wrec to implement a counter component.
Here are the steps:

1. Create a new directory for the project and `cd` to it.

1. Create a `package.json` file entering `npm init`.

1. Install wrec by entering `npm i wrec`.

1. Install vite by entering `npm i -D vite`.
   This is only used to run a local HTTP server.

1. Add the following script in `package.json`:

   ```json
   "dev": "vite"
   ```

1. Create the file `my-counter.js` containing the following.
   The tagged template literals with the tags `css` and `html` trigger the VS Code extension
   "Prettier" to add syntax highlighting and format the CSS and HTML strings.

   ```js
   import Wrec, { css, html } from "wrec";

   class MyCounter extends Wrec {
     static properties = {
       count: { type: Number },
     };

     static css = css`
       .counter {
         display: flex;
         align-items: center;
         gap: 0.5rem;
       }

       button {
         background-color: lightgreen;
       }

       button:disabled {
         background-color: gray;
       }
     `;

     static html = html`
       <div>
         <button onClick="decrement" type="button" disabled="this.count === 0">
           -
         </button>
         <span>this.count</span>
         <button onClick="this.count++" type="button">+</button>
         <span>(this.count < 10 ? "single" : "double") + " digit"</span>
       </div>
     `;

     decrement() {
       if (this.count > 0) this.count--;
     }
   }

   MyCounter.register();
   ```

1. Create the file `index.html` containing the following.

   ```html
   <html>
     <head>
       <script src="my-counter.js" type="module"></script>
     </head>
     <body>
       <my-counter count="3"></my-counter>
     </body>
   </html>
   ```

1. Start a local server by entering `npm run dev`.

1. Browse localhost:5173.

1. Click the "-" and "+" buttons to verify that the component is working.

## More Detail

To wire event listeners,
Wrec looks for attributes whose name begins with "on".
It assumes the remainder of the attribute name is an event name.
It also assumes that the value of the attribute is either
a method name that should be called or code that should be executed
when that event is dispatched.
For example, the attribute `onclick="increment"` causes Wrec to
add an event listener to the element containing the attribute
for "click" events and calls `this.increment(event)`.
Alternatively, the attribute `onclick="this.count++"`
adds an event listener that increments `this.count`
when the element is clicked.

The case of the event name within the attribute name
does not matter because Wrec lowercases the name.
So the attributes in the previous examples
can be replaced by `onClick="increment"`.

Wrec supports reactivity.
Attribute values and the text content of elements
can refer to web component properties with the syntax `this.somePropertyName`.
The DOM of the web component is surgically updated.
Only attribute values and text content
that refer to modified web component properties are updated.
Attribute values and text content that contain references to properties
must be valid JavaScript expressions that are NOT surrounded by `${...}`.
For an example of this kind of web component, see `examples/hello-world.js`.

Wrec supports conditional and iterative generation of HTML.
See `examples/temperature-eval.js` for an example of a web component
that conditionally decides what to render based on an attribute value.
See `examples/radio-group.js` for an example of a web component
that iterates over values in a comma-delimited attribute value
to determine what to render.

Wrec supports two-way data binding for HTML form elements.

- `input` and `select` elements can have a `value` attribute
  whose value is "this.somePropertyName".
- `textarea` elements can have text content
  that is "this.somePropertyName"

In all these cases, if the user changes the value of the form element,
the specified property is updated.
When the property is updated,
the displayed value of the form element is updated.
For examples, see `examples/data-bind.js`.

Web components that extend `Wrec` can contribute values to
form submissions by adding the following line to their class definition.
Wrec looks for this automatically does the rest of the work.

```js
static formAssociated = true;
```

## Security

Wrec uses the JavaScript `eval` function to evaluate JavaScript expressions
that are placed in attribute values and the text content of elements.
This has security implications if those expressions
can come from untrusted sources, so it is best avoid
creating web components that use untrusted content in those ways.

Perhaps the most dangerous thing the use of `eval` allows
is sending HTTP requests to other servers.
Such requests could contain data scraped from your web app
in order to share it with unscrupulous sites.

The easiest way to prevent this is to add a
Content Security Policy (CSP) to your web app.
Simply adding the following element as a child of the
`head` element in each page blocks sending HTTP requests
to any domain except that of your web app:

```html
<meta http-equiv="Content-Security-Policy" content="connect-src 'self'" />
```

## More Examples

Check out the web app in the `examples` directory.
To run it, cd to that directory, enter `npm install`,
enter `npm run dev`, and browse localhost:5173.

This app begins by rendering "counter" components.
The first is implemented as a vanilla web component.
The next two uses the Wrec library.
Compare the files `counter-vanilla.js` and `counter-wrec.js`
to see how much using Wrec simplifies the code.

The `examples` app renders several other
web components that are built with wrec.
Examine their code for more examples of wrec usage.
