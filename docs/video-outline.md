# wrec Video Tutorial Outline

This outline is based on the project README, the examples in `src/examples`,
and the architecture notes in `docs/how-wrec-works.md`.

## 1. Bold Claims

- I’ve had a long career and this is the best thing I’ve created
- You cannot create components with less code using any other library/framework
- You might not care if you're fine with
  generating UI code that you never examine or maintain

## 2. Introduction

- wrec is a library that simplifies developing web components,
  similar to Lit and Stencil.
- It has a strong emphasis on reactivity and simplicity.
- Updating a component property can cause the rendered DOM to update.

## 3. Project Setup

- Initialize a project with `npm init -y`
- Install `wrec` with `npm i wrec`
- Install Vite with `npm i -D vite`
- Add a simple `dev` script to `package.json`
- Create a minimal `index.html`

## 4. hello-world Component

- Import `Wrec`, `html`, and optionally `css`
- Create a class that extends `Wrec`
- Optionally define `static properties`
- Define `static html`
- Optionally define `static css`
- Optionally add methods
- Register the element with `.define(...)`
- Render the component in HTML
- Point to `src/examples/hello-world.js`

- Quick preview of examples such as `hello-world`, `counter`, and `state-demo`

## 5. Reactive Properties

- In `static properties` object, each property is configured with an object
- Explain types, default values, and attribute-to-property behavior
- Demonstrate changing a property from markup and DevTools
- Show how DOM updates happen automatically

## 6. Styling with static css

- Add component-scoped styles with `static css`
- Show basic `:host` styling and element styling
- Introduce reactive CSS as a standout feature
- Point to `src/examples/reactive-css.js` and `src/examples/css-demo.js`

## 7. Events and User Interaction

- Add buttons and inline handlers such as `onClick`
- Build a simple counter
- Show conditional attributes like disabling decrement at zero
- Point to `src/examples/counter-wrec.js`
- `input` and `select` element `value` attributes
  can have 2-way bindings to component properties

## 8. Expressions and Binding

- Explain that expressions can appear in text, attributes, and CSS
- Show derived UI such as conditional labels and live updates
- Demonstrate a binding-oriented example such as `number-bind` or
  `data-binding` (parent-child 2-way bindings)

## 9. Computed Properties

- Show when a value should be derived instead of manually updated
- Demonstrate width and height producing area
- Point to `src/examples/rectangle-area.ts`

## 10. Contributing to Form Submissions

## 11. Shared State with WrecState

- Explain when local component state is not enough
- Show two components sharing state
- Update one component and watch another react
- Point to `src/examples/state-demo.html` and `src/examples/state-demo2`

## 12. Advanced Features Sampler

- Enumerated property values with `values`
- Slots
- Refs
- SSR support at a high level
- Point to `traffic-light`, `slots-demo`, `ref-demo`, and the SSR section of
  the README

## 13. How wrec Works Internally

- Give a high-level explanation only
- Cover the two core maps described in the README:
  - `propToExprsMap`
  - `exprToRefsMap`
- Use `docs/how-wrec-works.md` to explain why updates are efficient

## 13. Testing and Exploring the Repo

- Point viewers to the examples in `src/examples`
- Mention the tests in `tests`
- Encourage experimenting in DevTools by changing attributes and properties

## 14. Wrap-Up

- Recap what `wrec` gives developers
- Explain when to choose it over plain custom elements
- Point viewers to the npm package, GitHub repository, and blog post for
  further reading
