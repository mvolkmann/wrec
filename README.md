# Web Reactive Component (wrec)

<img alt="shipwreck" src="shipwreck.png" style="width: 256px">

Wrec is a small, zero dependency library that
greatly simplifies building web components.
It is described in detail, with several working examples,
in [my blog](https://mvolkmann.github.io/blog/wrec/).
Also, see my series of
<a href="https://www.youtube.com/playlist?list=PLGhglgQb4jVk3-_wc8srORlGalSRFMEpR"
target="_blank">YouTube videos</a> on web components and the wrec library.

Wrec components achieve reactivity through two maps,
`propToExprsMap` and `#exprToRefsMap`.

`propToExprsMap` maps component property names
to the expressions where they appear.
This is a static map because only one is needed per wrec component.
The same mapping is used for each instance of the component.

`#exprToRefsMap` maps expressions to where they are referenced.
References can include the text content of elements,
attribute values, and CSS property values.
Each wrec component instance has one of these maps
because it contains instance-specific references.

When the value of a component property changes,
wrec uses `propToExprsMap` to find the expressions that must be re-evaluated.
For each expression, a new value is computed.
Then wrec uses `#exprToRefsMap` to find all the references to that expression
and updates them.

## Getting Started

A wrec component is defined by a class that extends the `Wrec` class.
It typically defines the static properties `properties`, `css`, and `html`.
Only the `html` property is required.

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
   import {css, html, Wrec} from 'wrec';

   class MyCounter extends Wrec {
     static properties = {
       count: {type: Number}
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
   <!DOCTYPE html>
   <html lang="en">
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

## Examples

To run the examples in the `src/examples` directory:

1. cd to the `wrec` project directory.
1. Enter `npm install`.
1. Enter `npm run dev`.
1. Browse `localhost:5173/examples/{name}.html` where `name`
   is the name of one of the `.html` files in that directory.

`hello-world.html` demonstrates a basic Wrec component.
Try modifying the `name` attribute in DevTools
by changing the attribute and then the property.
This uses the `hello-world` component.

`counter-4.html` demonstrates a counter component that cannot go negative
and displays whether the count is a single or multi-digit number.
This uses the `counter-wrec` component.

`number-bind.html` demonstrates
This uses the `number-bind`, `number-input`, and `number-slider` components.
Changing the value in the `number-input` or `number-slider` component
updates the other component and also the number after "Your score is".

`rectangle-area.html` demonstrates using a computed property
with and without the `uses` property.
This uses the `rectangle-area` and `number-slider` components.

`reactive.css.html` demonstrates reactive CSS.
Drag the slider to change the size of the text.
This uses the `reactive-css` component.

`css-demo.html` demonstrates more reactive CSS.
The color name entered in the input is used in three places,
the color of the `p` element,
the background color of the `#swatch` element,
and the text inside the `#swatch` element.
This uses the `css-demo` component.

`color-demo.html` demonstrates more reactive CSS. Try dragging the slider.
Examine the generated CSS which adds a CSS variable.
This uses the `color-demo`, `color-picker`, and `number-slider` components.

`data-binding.html` demonstrates some extreme data binding where
a comma-separated list of colors is used to generate radio buttons and a select list.
Select a radio button or select list option updates the other.
It also updates the color and content of the text at the bottom.
The "Enable" toggle enables and disables all the form controls.
Try changing the list of colors and the selected values in DevTools
by modifying attribute values or property values.
This uses the `data-binding`, `number-slider`, `radio-group`,
`select-list`, and `toggle-switch` components.

`speedometer-demo.html` demonstrates fancy graphics.
