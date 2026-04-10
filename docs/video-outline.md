# wrec Video Tutorial Outline

This outline is based on the project README, the examples in `src/examples`,
and the architecture notes in `docs/how-wrec-works.md`.

## 1. Introduction

- What `wrec` is: a small library for building reactive web components,
  similar to Lit and Stencil
- Who it is for: developers who want native custom elements with less
  boilerplate
- What viewers will build: a small reactive component, followed by a richer
  example

## 2. Why wrec

- Pain points with vanilla web components
- What `wrec` simplifies: reactive properties, templating, CSS, events, and
  shared state
- Quick preview of examples such as `hello-world`, `counter`, and `state-demo`

## 3. Project Setup

- Initialize a project with `npm init -y`
- Install `wrec` with `npm i wrec`
- Install Vite with `npm i -D vite`
- Add a simple `dev` script to `package.json`
- Create a minimal `index.html`
- Explain the local dev workflow from the README

## 4. First Component: Hello World

- Import `Wrec`, `html`, and optionally `css`
- Create a class that extends `Wrec`
- Define `static html`
- Register the element with `.define(...)`
- Render the component in HTML
- Point to `src/examples/hello-world.js`

## 5. Reactive Properties

- Add `static properties`
- Explain types, default values, and attribute-to-property behavior
- Demonstrate changing a property from markup and DevTools
- Show how DOM updates happen automatically

## 6. Styling with static css

- Add component-scoped styles
- Show basic `:host` styling and element styling
- Introduce reactive CSS as a standout feature
- Point to `src/examples/reactive-css.js` and `src/examples/css-demo.js`

## 7. Events and User Interaction

- Add buttons and inline handlers such as `onClick`
- Build a simple counter
- Show conditional attributes like disabling decrement at zero
- Point to `src/examples/counter-wrec.js`

## 8. Expressions and Binding

- Explain that expressions can appear in text, attributes, and CSS
- Show derived UI such as conditional labels and live updates
- Demonstrate a binding-oriented example such as `number-bind` or
  `data-binding`

## 9. Computed Properties

- Show when a value should be derived instead of manually updated
- Demonstrate width and height producing area
- Point to `src/examples/rectangle-area.ts`

## 10. Shared State with WrecState

- Explain when local component state is not enough
- Show two components sharing state
- Update one component and watch another react
- Point to `src/examples/state-demo.html` and `src/examples/state-demo2`

## 11. Advanced Features Sampler

- Enumerated property values with `values`
- Slots
- Refs
- SSR support at a high level
- Point to `traffic-light`, `slots-demo`, `ref-demo`, and the SSR section of
  the README

## 12. How wrec Works Internally

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
