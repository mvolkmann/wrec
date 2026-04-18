# State

The class `WrecState` maps state properties to wrec component properties.
Changing either updates the other to keep them in sync.
The state can optionally be persisted to `localStorage`
so page refreshes don't lose the data.

One use of `WrecState` is to remove the need for "prop drilling"
where attributes are used to pass data through
multiple levels of a component hierarchy.

Let's look at an example.

Here's the file `labeled-input.ts` which defines a wrec component
that renders `label` and `input` elements.

```ts
import {css, html, Wrec} from 'wrec';

class LabeledInput extends Wrec {
  static properties = {
    id: {type: String, required: true},
    label: {type: String, required: true},
    name: {type: String},
    value: {type: String}
  };

  static css = css`
    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;

  static html = html`
    <div>
      <label for="this.id">this.label</label>
      <input id="this.id" name="this.name" type="text" value="this.value" />
    </div>
  `;
}

LabeledInput.define('labeled-input');
```

Here's the file `index.html` which renders instances of the
`labeled-input` and `hello-world` (seen earlier) components.

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        font-family: sans-serif;
      }
    </style>
    <script type="module">
      // See below.
    </script>
  </head>
  <body>
    <labeled-input id="name" label="Name"></labeled-input>
    <hello-world></hello-world>
    <button>Reset</button>
  </body>
</html>
```

As it stands, we haven't yet imported the code for the two wrec components
and there is no use of `WrecState`.
Add the following in the `script` element:

```js
import {WrecState} from 'wrec';
import './hello-world.js';
import './labeled-input.js';

const state = new WrecState('demo', false, {name: 'World'});
const li = document.querySelector('labeled-input');
li.useState(state, {name: 'value'});
const hw = document.querySelector('hello-world');
hw.useState(state);

const button = document.querySelector('button');
button.addEventListener('click', () => {
  state.name = 'World';
});
```

This code creates a `WrecState` object, gives it the name "demo",
opts out of persisting to `localStorage`, and initializes its data.
Then it finds the `labeled-input` and `hello-world` elements in the DOM
and tells them to use the state object.
The second argument to the `useState` method describes the mapping
from state properties to component properties.
If this isn't supplied, like in the second call,
the mapping defaults to identically named properties.

If the user modifies the value in the `labeled-input`,
the new value is set in the state.
Since the `hello-world` component also uses the same state property,
that is also updated.

If the user clicks the "Reset" button,
the state `name` property is reset to "World".
Since the `labeled-input` component also uses the same state property,
that is also updated.

Note how the wrec components did not need to be modified
to use state. All the wiring happens outside of those components.

You can modify state from the browser DevTools console as well.
For example, entering the following updates both components.

```js
state = WrecState.get('demo');
state.name = 'Earth';
```

The types of `WrecState` properties and wrec component properties
can be primitive values or objects.
When they are objects, nested properties can be set directly.
The changes are properly synced and the DOM properly updates.
For an example of this, see the project at
web-component-book-code/ch09/state-objects.
