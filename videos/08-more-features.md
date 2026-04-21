# Wrap Up

## More Features

Wrec components support the use of slots
in the same way as vanilla web components.

HTML elements rendered by a wrec component can have a `ref` attribute
whose value is the name of component property with type `HTMLElement`.
That property will be set to a reference to the element
so it can be accessed from component methods.
For an example of using this, browse the
[web-component-book-code](https://github.com/mvolkmann/web-component-book-code)
repository, select "ch15", select "hard-coded", and select "light-controller.ts".

Wrec supports server-side rendering (SSR). For an example, see
For an example of using this, browse the
[web-component-book-code](https://github.com/mvolkmann/web-component-book-code)
repository, select "ch14", and select "wrec-ssr-demo".

## More Examples

For more examples of wrec components,
see https://github.com/mvolkmann/wrec/tree/main/src/examples
and https://github.com/mvolkmann/web-component-book-code/tree/main/ch09.

## Tests

The wrec library is well-tested.

To run the unit tests, enter `npm run unittest`.

To run the end-to-end tests, implemented with Playwright,
enter `npm run test`.

## Resources

- wrec blog page:https://mvolkmann.github.io/blog/wrec
- wrec in npm: https://www.npmjs.com/package/wrec
- wrec repository: https://github.com/mvolkmann/wrec
