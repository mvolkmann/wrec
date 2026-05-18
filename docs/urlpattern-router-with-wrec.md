# Using Native `URLPattern` with wrec Components

[`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
is a browser API for matching URLs and extracting named groups from them.
It can be used to build a client-side router for `wrec` components.

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

## Create wrec View Components

Each routed page is just a custom element created with `Wrec`.

```ts
import { html, Wrec } from "wrec";

class HomeView extends Wrec {
  static html = html`
    <h1>Home</h1>
    <p>Welcome to the home page.</p>
  `;
}

HomeView.define("home-view");
```

Route params can be assigned to properties on the created element.

```ts
import { html, Wrec } from "wrec";

class UserView extends Wrec {
  static properties = {
    userId: { type: String, value: "" },
  };

  static html = html`
    <h1>User</h1>
    <p>User id: <span>this.userId</span></p>
  `;
}

UserView.define("user-view");
```

Add a fallback component for unmatched paths.

```ts
import { html, Wrec } from "wrec";

class NotFoundView extends Wrec {
  static html = html`
    <h1>Not found</h1>
    <p>The requested page does not exist.</p>
  `;
}

NotFoundView.define("not-found-view");
```

## Define Routes

Create a small route table. Each route has a `URLPattern`, a custom element tag
name, and an optional mapping function for route params.

```ts
import "./views/home-view";
import "./views/not-found-view";
import "./views/user-view";

type Route = {
  getProperties?: (params: Record<string, string>) => Record<string, unknown>;
  pattern: URLPattern;
  tagName: string;
};

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    tagName: "home-view",
  },
  {
    getProperties: (params) => ({ userId: params.id }),
    pattern: new URLPattern({ pathname: "/users/:id" }),
    tagName: "user-view",
  },
  {
    pattern: new URLPattern({ pathname: "/*" }),
    tagName: "not-found-view",
  },
];
```

`URLPattern` supports path parameters such as `/users/:id`. Matching returns
groups for each named parameter.

## Match the Current Route

Resolve the current URL by finding the first matching pattern.

```ts
type RouteMatch = {
  params: Record<string, string>;
  route: Route;
};

// Finds the first route that matches a URL.
function matchRoute(url: string): RouteMatch {
  for (const route of routes) {
    const result = route.pattern.exec(url);

    if (result) {
      return {
        params: result.pathname.groups,
        route,
      };
    }
  }

  return {
    params: {},
    route: routes[routes.length - 1],
  };
}
```

## Render the Current Route

After matching, create the custom element, assign route-derived properties, and
replace the outlet contents.

```ts
// Creates the custom element for a matched route.
function createRouteElement(match: RouteMatch): HTMLElement {
  const { params, route } = match;
  const element = document.createElement(route.tagName);
  const properties = route.getProperties?.(params);

  Object.assign(element, properties);

  return element;
}

// Resolves a path and renders the matching route into the outlet.
export function renderRoute(
  outlet: HTMLElement,
  path = location.pathname,
): void {
  const url = new URL(path, location.origin);
  const match = matchRoute(url.href);
  const element = createRouteElement(match);

  outlet.replaceChildren(element);
}
```

## Add Client-Side Navigation

Use the History API to update the URL without reloading the page.

```ts
// Navigates to a new path and renders it.
export function navigateTo(outlet: HTMLElement, path: string): void {
  history.pushState(null, "", path);
  renderRoute(outlet, path);
}

// Starts browser back and forward button handling.
export function startRouteListener(outlet: HTMLElement): void {
  window.addEventListener("popstate", () => {
    renderRoute(outlet);
  });
}
```

You can intercept same-origin links from the app shell
so normal anchors become client-side navigations.

```ts
// Handles app-local link clicks without a full page load.
export function handleLinkClick(event: MouseEvent, outlet: HTMLElement): void {
  const link = event
    .composedPath()
    .find((target) => target instanceof HTMLAnchorElement) as
    | HTMLAnchorElement
    | undefined;

  if (!link || link.origin !== location.origin || link.target) return;

  event.preventDefault();
  navigateTo(outlet, link.pathname + link.search + link.hash);
}
```

## Add an App Shell

The app shell provides navigation and the outlet.

```ts
import { html, Wrec } from "wrec";

import { handleLinkClick, renderRoute, startRouteListener } from "./router";

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
    const outlet = this.shadowRoot?.getElementById("outlet");

    if (outlet instanceof HTMLElement) {
      this.addEventListener("click", (event) => {
        handleLinkClick(event, outlet);
      });
      startRouteListener(outlet);
      renderRoute(outlet);
    }
  }
}

AppRoot.define("app-root");
```

Then mount the app shell from HTML.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>wrec with URLPattern routing</title>
    <script type="module" src="/src/app-root.ts"></script>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

## Lazy Loading Views

For larger apps, add a `load` function to each route and call it before creating
the element.

```ts
type Route = {
  getProperties?: (params: Record<string, string>) => Record<string, unknown>;
  load?: () => Promise<void>;
  pattern: URLPattern;
  tagName: string;
};

const routes: Route[] = [
  {
    load: () => import("./views/home-view").then(() => undefined),
    pattern: new URLPattern({ pathname: "/" }),
    tagName: "home-view",
  },
  {
    getProperties: (params) => ({ userId: params.id }),
    load: () => import("./views/user-view").then(() => undefined),
    pattern: new URLPattern({ pathname: "/users/:id" }),
    tagName: "user-view",
  },
];

// Resolves a path, loads the matched view, and renders it.
export async function renderRoute(
  outlet: HTMLElement,
  path = location.pathname,
): Promise<void> {
  const url = new URL(path, location.origin);
  const match = matchRoute(url.href);

  await match.route.load?.();

  outlet.replaceChildren(createRouteElement(match));
}
```

## Browser Refreshes and Deployment

Client-side routes need a server fallback. For example, refreshing `/users/42`
should serve the same `index.html` file as `/`. Vite handles this during
development. In production, configure the static host or web server to fall back
to `index.html` for application routes.

## When to Use This

Use native `URLPattern` when your routing needs are modest and you want no
routing dependency. It is especially good for small apps, demos, documentation
examples, and libraries that want to show routing without blessing a particular
third-party package.

Use `universal-router` instead when you want a package that already handles more
router conventions, especially nested route trees and async route actions.
