# Wrap Up

## More Features

Wrec components support the use of slots
in the same way as vanilla web components.

HTML elements rendered by wrec can have a `ref` attribute
whose value is the name of component property with type `HTMLElement`.
That property will be set to a reference to the element
so it can be accessed from component methods.

Wrec supports server-side rendering (SSR). For an example, see
https://github.com/mvolkmann/web-component-book-code/tree/main/ch14/wrec-ssr-demo.

## More Examples

For more examples of wrec components,
see https://github.com/mvolkmann/wrec/tree/main/src/examples
and https://github.com/mvolkmann/web-component-book-code/tree/main/ch09.

The wrec library is well-tested.
To run its unit tests, enter `npm run unittest`
To run its end-to-end tests, implemented with Playwright,
enter `npm run test`.

## Resources

- wrec in npm: https://www.npmjs.com/package/wrec
- wrec repository: https://github.com/mvolkmann/wrec
- wrec blog page:https://mvolkmann.github.io/blog/wrec/
