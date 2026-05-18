# Using `universal-router` with wrec Components

[`universal-router`](https://www.npmjs.com/package/universal-router)
is a framework-agnostic route matcher.
It doesn't render anything by itself.
Let `universal-router` decide which route matched,
then create the matching custom element and place it in an outlet.

This approach keeps routing outside the `wrec` library,
so routed components remain ordinary web components.

## Install

```sh
npm install universal-router
```

## Basic File Layout

```text
src/
  app-root.ts
  router.ts
  views/
    home-view.ts
    not-found-view.ts
    user-view.ts
index.html
```

## Route Parameters

Route parameters can be assigned to wrec properties.
For example, the `/users/:id` route can create a `user-view` element
and set its `userId` property.

```ts
import {html, Wrec} from 'wrec';

class UserView extends Wrec {
  static properties = {
    userId: {type: String, value: ''}
  };

  static html = html`
    <h1>User</h1>
    <p>User id: <span>this.userId</span></p>
  `;
}

UserView.define('user-view');
```

Add a fallback component for unmatched paths.

```ts
import {html, Wrec} from 'wrec';

class NotFoundView extends Wrec {
  static html = html`
    <h1>Not found</h1>
    <p>The requested page does not exist.</p>
  `;
}

NotFoundView.define('not-found-view');
```

## Configure Routes

Create a router module that returns a small render instruction from each route.
The render instruction contains the custom element tag name and optional
properties to assign to the element.

```ts
import UniversalRouter from 'universal-router';

import './views/home-view';
import './views/not-found-view';
import './views/user-view';

type RouteResult = {
  properties?: Record<string, unknown>;
  tagName: string;
};

const router = new UniversalRouter<RouteResult>([
  {
    path: '',
    action: () => ({tagName: 'home-view'})
  },
  {
    path: '/users/:id',
    action: context => ({
      properties: {userId: context.params.id},
      tagName: 'user-view'
    })
  },
  {
    path: '(.*)',
    action: () => ({tagName: 'not-found-view'})
  }
]);
```

The empty path route matches the root path.
Route params are available on `context.params`.

## Render the Current Route

Add helper functions that resolve the current path and replace the outlet
contents with the selected custom element.

```ts
// Creates the custom element for a matched route.
function createRouteElement(result: RouteResult): HTMLElement {
  const element = document.createElement(result.tagName);
  Object.assign(element, result.properties);
  return element;
}

// Resolves a path and renders the matching route into the outlet.
export async function renderRoute(
  outlet: HTMLElement,
  path = location.pathname
): Promise<void> {
  const result = await router.resolve(path);
  const element = createRouteElement(result);
  outlet.replaceChildren(element);
}
```

## Add Client-Side Navigation

Use the History API for navigation.
This keeps the page from reloading and lets the router update the outlet.

```ts
// Navigates to a new path and renders it.
export async function navigateTo(
  outlet: HTMLElement,
  path: string
): Promise<void> {
  history.pushState(null, '', path);
  await renderRoute(outlet, path);
}

// Starts browser back and forward button handling.
export function startRouteListener(outlet: HTMLElement): void {
  window.addEventListener('popstate', () => {
    void renderRoute(outlet);
  });
}
```

You can also intercept same-origin anchor clicks inside the app shell.

```ts
// Handles app-local link clicks without a full page load.
export function handleLinkClick(event: MouseEvent, outlet: HTMLElement): void {
  const link = event
    .composedPath()
    .find(target => target instanceof HTMLAnchorElement) as
    | HTMLAnchorElement
    | undefined;

  if (!link || link.origin !== location.origin || link.target) return;

  event.preventDefault();
  void navigateTo(outlet, link.pathname + link.search + link.hash);
}
```

## Add an App Shell

The app shell owns the outlet and starts routing when the component is ready.

```ts
import {html, Wrec} from 'wrec';

import {handleLinkClick, renderRoute, startRouteListener} from './router';

class AppRoot extends Wrec {
  static html = html`
    <nav>
      <a href="/">Home</a>
      <a href="/users/42">User 42</a>
    </nav>

    <main id="outlet"></main>
  `;

  // Starts route rendering after the outlet exists.
  ready(): void {
    const outlet = this.shadowRoot?.getElementById('outlet');

    if (outlet instanceof HTMLElement) {
      this.addEventListener('click', event => {
        handleLinkClick(event, outlet);
      });
      startRouteListener(outlet);
      void renderRoute(outlet);
    }
  }
}

AppRoot.define('app-root');
```

Then mount the app shell from HTML.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>wrec with universal-router</title>
    <script type="module" src="/src/app-root.ts"></script>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

## Lazy Loading Views

Route actions can import view modules only when a route matches.

```ts
const router = new UniversalRouter<RouteResult>([
  {
    path: '',
    action: async () => {
      await import('./views/home-view');
      return {tagName: 'home-view'};
    }
  },
  {
    path: '/users/:id',
    action: async context => {
      await import('./views/user-view');
      return {
        properties: {userId: context.params.id},
        tagName: 'user-view'
      };
    }
  }
]);
```

## Browser Refreshes and Deployment

Client-side routes need a server fallback. For example, refreshing `/users/42`
should serve the same `index.html` file as `/`. Vite handles this during
development. In production, configure the static host or web server to fall back
to `index.html` for application routes.

## When to Use This

Use `universal-router` when you want a maintained, framework-agnostic package
for route matching, nested routes, async route actions, and route params.

Use a native `URLPattern` router instead when your routing needs are small and
you prefer no routing dependency.
