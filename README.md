# Web Reactive Component Kit (Wreck)

<img alt="shipwreck" src="shipwreck.png" style="width: 256px">

Wreck is a small library that greatly simplifies building web components.
It is inspired by [Lit](https://lit.dev).

Wreck has fewer features that Lit.
In exchange, Wreck:

- is much smaller than Lit (about 1/4 of the size)
- doesn't require any tooling
- doesn't require a build process

The main features of Wreck are that it
automates wiring event listeners
and automates implementing reactivity.

Check out the web app in the `demo` directory.
To run it, cd to that directory, enter `npm install`,
enter `npm run dev`, and browse localhost:5173.
This app begins by rendering "counter" components.
The first is implemented as a vanilla web component.
The next two uses the Wreck library.
Compare the files `counter-vanilla.js` and `counter-wreck.js`
to see how much using Wreck simplifies the code.

To wire event listeners,
Wreck looks for attributes whose name begins with "on".
It assumes the remainder of the attribute name is an event name.
It also assumes that the value of the attribute is either
a method name that should be called or code that should be executed
when that event is dispatched.
For example, the attribute `onclick="increment"` causes Wreck to
add an event listener to the element containing the attribute
for "click" events and calls `this.increment(event)`.
Alternatively, the attribute `onclick="this.count++"`
adds an event listener that increments `this.count`
when the element is clicked.

The case of the event name within the attribute name
does not matter because Wreck lowercases the name.
So the attribute in the previous example
can be replaced by `onClick="increment"`.

Wreck supports reactivity.
Attribute values and the text content of elements
can refer to web component properties with the syntax `this.propertyName`.
The DOM of the web component is surgically updated.
Only attribute values and text content
that refer to modified web component properties are updated.
Attribute values and text content that contain references to properties
must be valid JavaScript expressions that are NOT surrounded by `${...}`.
For an example of this kind of web component, see `demo/hello-world.js`.

Wreck supports two-way data binding for HTML form elements.

- `input` and `select` elements can have a `value` attribute
  whose value is "this.somePropertyName".
- `textarea` elements can have text content
  that is "this.somePropertyName"

In all these cases, if the user changes the value of the form element,
the specified property is updated.
When the property is updated,
the displayed value of the form element is updated.
For examples, see `demo/data-bind.js`.

Web components that extend `Wreck` can contribute values to
form submissions by adding the following line to their class definition.
Wreck looks for that automatically does the rest of the work.

```js
static formAssociated = true;
```

Wreck supports conditional and iterative generation of HTML.
See `demo/temperature-eval.js` for an example of a web component
that conditionally decides what to render based on an attribute value.
See `demo/radio-group.js` for an example of a web component
that iterates over values in a comma-delimited attribute value
to determine what to render.
