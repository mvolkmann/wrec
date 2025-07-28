# Web Reactive Component (wrec)

<img alt="shipwreck" src="shipwreck.png" style="width: 256px">

Wrec is a small, zero dependency library that
greatly simplifies building web components.
It is described in detail, with several working examples,
in [my blog](https://mvolkmann.github.io/blog/wrec/).
Also, see my series of
<a href="https://www.youtube.com/playlist?list=PLGhglgQb4jVk3-_wc8srORlGalSRFMEpR"
target="_blank">YouTube videos</a> on web components and the wrec library.

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
   import Wrec, {css, html} from 'wrec';

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
