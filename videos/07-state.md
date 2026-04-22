# State

The class `WrecState` maps state properties to wrec component properties.
Changing either updates the other to keep them in sync.
The state can optionally be persisted to `sessionStorage`
so page refreshes don't lose the data.

One use of `WrecState` is to remove the need for "prop drilling"
where attributes are used to pass data through
multiple levels of a component hierarchy.

Let's look at an example.
This code can be found in the "state" directory.

- Create a new directory named "state".
- cd to it.
- Create a `package.json` file by entering `npm init -y`.
- Install the wrec library by entering `npm i wrec`.
- Copy `hello-world.ts` from the `hello-world` project.
- Create a `labeled-input.ts` file containing the following:

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

This renders `label` and `input` elements.

Create the `index.html` file containing the following:

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

This renders instances of the `labeled-input` and `hello-world` components.

As it stands, we haven't yet imported the code for the two wrec components
and there is no use of `WrecState`.
Add the following in the `script` element:

```js
import {WrecState} from 'wrec';
import './hello-world.js';
import './labeled-input.js';

const state = new WrecState('demo', {name: 'World'});
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
and initializes its data. Because the second constructor argument
is not a Boolean value, the data is not persisted to `sessionStorage`.
Next, it finds the `labeled-input` and `hello-world` elements in the DOM
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

Note how the wrec components didn't required modifications to use state.
All the wiring occurs outside of the component code.

You can modify state from the browser DevTools console as well.
Doing so triggers updates to the mapped component properties.
For example, entering the following updates both components.

```js
state = WrecState.get('demo');
state.name = 'Earth';
```

The same code can be used anywhere in an application
to get a reference to a `WrecState` object,
get the properties it holds, and modify its properties.

The types of `WrecState` properties and wrec component properties
can be primitive values or objects.
When they are objects, nested properties can be set directly.
The changes are properly synced and the DOM properly updates.
For an example of this, see the "state-objects" directory.
