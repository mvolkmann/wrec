# Web Reactive Component (wrec)

<script src="hello-world.js" type="module"></script>
<img alt="shipwreck" src="shipwreck.png" style="width: 256px">

<hello-world></hello-world>

Wrec is a small, zero dependency library that
greatly simplifies building web components.
Its main features are that it automates
wiring event listeners and implementing reactivity.

Wrec was inspired by [Lit](https://lit.dev).
It has the following advantages over Lit:

- Wrec is simpler ... just a single class to extend (Wrec).
- Wrec is slightly smaller ... 4K versus 5.8K minified.
- Wrec has a cleaner syntax ... no need to
  surround JS expressions with `${...}`.
- Wrec provides automatic 2-way data binding ...
  no need to dispatch custom events and listen for them.
- Wrec doesn't require a special syntax for Boolean attributes.
- Wrec enables specifying the content of a `textarea` element
  with a JavaScript expressions in its text content.

Wrec components have many of the features provided by Alpine.js.

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
       :host {
         display: block;
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
         <button
           onClick="this.count--"
           type="button"
           disabled="this.count === 0"
         >
           -
         </button>
         <span>this.count</span>
         <button onClick="this.count++" type="button">+</button>
         <span>(this.count < 10 ? "single" : "double") + " digit"</span>
       </div>
     `;
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

## Reactivity

Wrec supports reactivity.
Attribute values and the text content of elements
can refer to web component properties with the syntax `this.somePropertyName`.
In this context, `this` always refers to the parent web component.
The DOM of the web component is surgically updated.
Only attribute values and text content
that refer to modified web component properties are updated.
Attribute values and text content that contain references to properties
must be valid JavaScript expressions that are NOT surrounded by `${...}`.
For an example of this kind of web component, see `examples/hello-world.js`.

Wrec evaluates JavaScript expressions in the context of a web component instance
which can be referred to with the `this` keyword in the expressions.

To render "this." followed by a valid JavaScript identifier without
replacing it with the value of the expression, escaping with a double period.
For example, `this.count` will be reactively replaced with its value,
but `this..count` will render the text with a single period.

In insert the value of an expression
that does not use properties of the web component,
into an HTML template string,
surround the expression with the syntax `${...}`.
For example, assuming `DAYS` is a variable
whose value is an array of month names:

```html
<p>The month is ${DAYS[new Date().getDay()]}.</p>
```

## Reactive CSS

CSS property values cannot refer to web component properties
with the syntax `this.somePropertyName`.
This is because the CSS parser in browsers removes invalid property values.
A workaround is to place such references in a CSS variable
and refer to that variable from a CSS property.
For an example of this, see `examples/data-binding.js`
which contains the following CSS:

```css
p {
  --color: this.color;
  --size: this.size;
  color: var(--color);
  font-size: calc(var(--size) * 1px);
  margin: 6px 0;
}
```

CSS variable values can be any valid JavaScript expression.
The example above can be changed to double the size as follows:

```css
--size: this.size * 2;
```

## Required Attributes

The configuration object for required attributes in a Wrec component
should contain `required: true`.
For an example of this, see the `name` property in `examples/radio-group.js`.

## Boolean Attributes

When the value of an attribute is a Boolean,
wrec adds the attribute to the element with no value
or removes the attribute from the element.
This is commonly used for attributes like `disabled`.

## Computed Properties

The value of a property can be computed using the values of other properties.
To do this, add the `computed` attribute to the description of the property.
For example:

```js
static properties = {
  width: { type: Number },
  height: { type: Number },
  area: {
    type: Number,
    computed: "this.width * this.height"
  }
};
```

The `computed` expression can call a function.
For example:

```js
static properties = {
  width: { type: Number },
  height: { type: Number },
  area: {
    type: Number,
    computed: "this.rectangleArea(this.width, this.height)"
  }
};

rectangleArea(width, height) {
  return width * height;
}
```

If the function depends on properties whose values are not passed to it,
add the `uses` property to specify a
comma-separated string of properties that the function uses.
Every time the value of one of those properties changes,
the function will be called again
to set a new value for the computed property.
For example:

```js
static properties = {
  width: { type: Number },
  height: { type: Number },
  area: {
    type: Number,
    computed: "this.rectangleArea()",
    uses: "width,height"
  }
};

rectangleArea() {
  return this.width * this.height;
}
```

For a full code example, see `examples/rectangle-area.js`.

## Event Listeners

To wire event listeners,
Wrec looks for attributes whose name begins with "on".
It assumes the remainder of the attribute name is an event name.
It also assumes that the value of the attribute is either
a method name that should be called or code that should be executed
when that event is dispatched.
For example, with the attribute `onclick="increment"`,
if `increment` is a method in the component, wrec will
add an event listener to the element containing the attribute
for "click" events and call `this.increment(event)`.
Alternatively, the attribute `onclick="this.count++"`
adds an event listener that increments `this.count`
when the element is clicked.

The case of the event name within the attribute name
does not matter because Wrec lowercases the name.
So the attributes in the previous examples
can be replaced by `onClick="increment"`.

## Property Change Events

Wrec components will dispatch change events whenever
a property configured with `dispatch: true` changes.
For an example of this,
see the `checked` property in `examples/toggle-switch.js`.
The component defined in `examples/binding-demo.js`
listens for that event, as does the `script` in `examples/index.html`.

## Conditional and Iterative HTML Generation

Wrec supports conditional and iterative generation of HTML.
See `examples/temperature-eval.js` for an example of a web component
that conditionally decides what to render based on an attribute value.
See `examples/radio-group.js` for an example of a web component
that iterates over values in a comma-delimited attribute value
to determine what to render.

## Data Binding

Wrec supports two-way data binding.
See the example component binding-demo
and the components it renders.

Wrec two-way data binding can be used with HTML form elements.

- `input` and `select` elements can have a `value` attribute
  whose value is "this.somePropertyName".
- `textarea` elements can have text content
  that is "this.somePropertyName"

In all these cases, if the user changes the value of the form element,
the specified property is updated.
When the property is updated,
the displayed value of the form element is updated.
For examples, see `examples/data-bind.js`.

Data binding in Lit is not two-way like in wrec.
A Lit component cannot simply pass one of its properties to
a child Lit component and have the child can update the property.
The child must dispatch custom events that
the parent listens for so it can update its own state.
For an example of this, see
[wrec-compare](https://github.com/mvolkmann/lit-examples/blob/main/wrec-compare/binding-demo.ts).

## Form Submissions

Web components that extend `Wrec` can contribute values to
form submissions by adding the following line to their class definition.
Wrec looks for this automatically does the rest of the work.

```js
static formAssociated = true;
```

## Error Checking

Wrec checks for many kinds of errors and throws an `Error` when they are found.
Look for messages in the DevTools console.
The kinds of errors that are detected include:

- attribute names in web component instances
  with no matching property declaration
- attribute values with a type that differs from the declared property type
- event handling function names that
  don't match any method name in the web component
- expressions in attribute values or element text content
  that reference undeclared web component properties
- expressions in element text content
  that do not evaluate to a string or number

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

## Tests

wrec has an extensive set of Playwright tests.
To run them:

1. Clone the wrec repository.
1. cd to the `examples` directory.
1. Enter `npm install`.
1. Enter `npm run testui`.
1. Click the right pointing triangle.

If there is no "Action" tab which displays a browser view of the running tests,
reset the Playwright UI settings by entering one of these commands:

```bash
# macOS
rm -rf ~/Library/Caches/ms-playwright/.settings

# Windows
del %LOCALAPPDATA%\ms-playwright\.settings /s /q
```
