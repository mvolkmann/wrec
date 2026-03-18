# How wrec Works

This diagram summarizes the runtime flow in `wrec`, based on the logic in
`src/wrec.ts`, `src/wrec-state.ts`, and `src/wrec-ssr.ts`.

```mermaid
flowchart TD
  A[Developer defines a class<br/>extends Wrec] --> B[Static metadata<br/>properties, html, css, context]
  B --> C[MyComponent.define custom element]

  C --> D[Browser creates element instance]
  D --> E[Wrec constructor<br/>attachShadow open<br/>initialize subclass maps]
  E --> F[connectedCallback]

  F --> G[Validate attributes]
  G --> H[Define reactive properties]
  H --> I[Build DOM from static html + css]
  I --> J[Clone cached template into shadow root]
  J --> K[Wire event handlers]
  K --> L[Scan DOM/CSS for expressions]

  L --> M[propToExprsMap<br/>static per subclass<br/>property -> expressions]
  L --> N[exprToRefsMap<br/>per instance<br/>expression -> DOM/CSS refs]
  H --> O[propToComputedMap<br/>static per subclass<br/>property -> computed props]
  L --> P[Evaluate initial expressions]
  O --> Q[Compute initial computed properties]

  subgraph Runtime Updates
    R[Property changes]
    S[Attribute changes]
    T[User input / DOM event]
    U[WrecState change]
    V[Child component change]
  end

  S --> R
  T --> R
  U --> R
  V --> R

  R --> W[Validate/coerce type]
  W --> X[Sync matching attribute]
  W --> Y[Sync bound WrecState path]
  W --> Z[Update computed properties]
  W --> AA[Dispatch optional change event]
  W --> AB[Propagate to bound parent prop]

  Z --> AC[Look up affected expressions in propToExprsMap]
  M --> AC
  N --> AD[Find bound text, attributes,<br/>textarea values, CSS vars]
  AC --> AE[Re-evaluate expressions in component context]
  AE --> AD
  AD --> AF[Patch only affected DOM/CSS targets]

  subgraph Shared State
    AG[WrecState]
    AH[Deep Proxy watches nested writes]
    AI[Listeners notified with state path]
  end

  AG --> AH --> AI --> U
  R -->|useState / setPathValue| AG

  subgraph SSR Path
    AJ[Import from wrec/ssr]
    AK[Wrec.ssr props]
    AL[buildHTML + evaluate expressions]
    AM[Return declarative shadow DOM HTML]
  end

  AJ --> AK --> AL --> AM
```

## Key Ideas

- `propToExprsMap` is built once per component class and tells `wrec` which
  expressions depend on each property.
- `exprToRefsMap` is built per component instance and tells `wrec` where each
  expression appears in the rendered DOM or CSS.
- When a property changes, `wrec` updates computed properties first, then
  re-evaluates only the expressions affected by that change.
- `WrecState` uses deep proxies plus listener registration so shared state
  changes can update bound component properties.
- If an expression renders HTML, `wrec` sanitizes it before inserting it.
