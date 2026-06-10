import { JSDOM } from "jsdom";
import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest";

let dom: JSDOM;
let elementIndex = 0;
type WrecModule = typeof import("./wrec.js");
let html: WrecModule["html"];
let Wrec: WrecModule["Wrec"];
let WrecState: WrecModule["WrecState"];

const globalNames = [
  "CSSStyleRule",
  "CustomEvent",
  "customElements",
  "document",
  "Element",
  "Event",
  "FormData",
  "HTMLButtonElement",
  "HTMLElement",
  "HTMLFieldSetElement",
  "HTMLInputElement",
  "HTMLSelectElement",
  "HTMLStyleElement",
  "HTMLTemplateElement",
  "HTMLTextAreaElement",
  "Node",
  "sessionStorage",
  "ShadowRoot",
  "window",
] as const;
const originalGlobals = new Map<string, { hadValue: boolean; value: unknown }>();

beforeAll(async () => {
  vi.resetModules();
  dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "http://localhost",
  });
  assignDomGlobals(dom.window);
  ({ html, Wrec, WrecState } = await import("./wrec.js"));
});

afterAll(() => {
  restoreDomGlobals();
  vi.resetModules();
});

afterEach(() => {
  document.body.replaceChildren();
});

// Assigns jsdom globals before importing the Wrec runtime.
function assignDomGlobals(window: Window & typeof globalThis) {
  for (const name of globalNames) {
    originalGlobals.set(name, {
      hadValue: Object.prototype.hasOwnProperty.call(globalThis, name),
      value: (globalThis as Record<string, unknown>)[name],
    });
    (globalThis as Record<string, unknown>)[name] = window[name];
  }
}

// Generates a unique custom element name for each test fixture.
function getElementName(prefix: string) {
  elementIndex += 1;
  return `${prefix}-${elementIndex}`;
}

// Restores globals that were replaced with jsdom equivalents.
function restoreDomGlobals() {
  for (const [name, original] of originalGlobals.entries()) {
    if (original.hadValue) {
      (globalThis as Record<string, unknown>)[name] = original.value;
    } else {
      delete (globalThis as Record<string, unknown>)[name];
    }
  }
  originalGlobals.clear();
}

// Waits for async component lifecycle work to finish.
async function waitForUpdates() {
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));
}

test("renders dynamic HTML and wires events inside injected markup", async () => {
  class DynamicMarkupFixture extends Wrec {
    static properties = {
      count: { type: Number, value: 0 },
      markup: {
        type: String,
        value: '<button id="inner" onClick="increment" type="button">+</button>',
      },
    };

    static html = html`
      <div id="content">this.markup</div>
      <p id="count">this.count</p>
    `;

    declare count: number;
    declare markup: string;

    // Increments the count property.
    increment() {
      this.count += 1;
    }
  }

  const elementName = getElementName("dynamic-markup-fixture");
  DynamicMarkupFixture.define(elementName);

  const element = document.createElement(elementName) as DynamicMarkupFixture;
  document.body.appendChild(element);
  await waitForUpdates();

  const button = element.shadowRoot?.querySelector("#inner") as HTMLButtonElement | null;
  const content = element.shadowRoot?.querySelector("#content");
  const count = element.shadowRoot?.querySelector("#count");

  expect(button).not.toBeNull();
  expect(content?.innerHTML).toContain('id="inner"');
  expect(count?.textContent).toBe("0");

  button?.click();
  await waitForUpdates();

  expect(element.count).toBe(1);
  expect(count?.textContent).toBe("1");
});

test("syncs component state from WrecState subscriptions", async () => {
  class StateFixture extends Wrec {
    static properties = {
      name: { type: String, value: "unknown" },
    };

    static html = html`<p id="name">this.name</p>`;

    declare name: string;
  }

  const elementName = getElementName("state-fixture");
  StateFixture.define(elementName);

  const stateName = `runtime-state-${elementName}`;
  const state = new WrecState(stateName, { name: "World" });
  const element = document.createElement(elementName) as StateFixture;

  element.useState(state);
  document.body.appendChild(element);
  await waitForUpdates();

  const name = element.shadowRoot?.querySelector("#name");
  expect(name?.textContent).toBe("World");

  state.name = "Alice";
  await waitForUpdates();

  expect(element.name).toBe("Alice");
  expect(name?.textContent).toBe("Alice");
});

test("disconnects cleanly and unsubscribes from WrecState updates", async () => {
  class DisconnectFixture extends Wrec {
    static properties = {
      name: { type: String, value: "unknown" },
    };
    static html = html`<p id="name">this.name</p>`;
    declare name: string;
  }

  const elementName = getElementName("disconnect-fixture");
  DisconnectFixture.define(elementName);

  const stateName = `runtime-state-${elementName}`;
  const state = new WrecState(stateName, { name: "World" });
  const element = document.createElement(elementName) as DisconnectFixture;

  element.useState(state);
  document.body.appendChild(element);
  await waitForUpdates();

  expect(() => {
    document.body.removeChild(element);
  }).not.toThrow();

  state.name = "Alice";
  await waitForUpdates();

  expect(element.name).toBe("World");
});

test("updates computed content when a property changes", async () => {
  class CounterFixture extends Wrec {
    static properties = {
      count: { type: Number, value: 1 },
      doubled: { type: Number, computed: "this.count * 2" },
    };

    static html = html`
      <p id="count">this.count</p>
      <p id="doubled">this.doubled</p>
    `;

    declare count: number;
    declare doubled: number;
  }

  const elementName = getElementName("counter-fixture");
  CounterFixture.define(elementName);

  const element = document.createElement(elementName) as CounterFixture;
  document.body.appendChild(element);
  await waitForUpdates();

  const count = element.shadowRoot?.querySelector("#count");
  const doubled = element.shadowRoot?.querySelector("#doubled");

  expect(count?.textContent).toBe("1");
  expect(doubled?.textContent).toBe("2");

  element.count = 4;
  await waitForUpdates();

  expect(count?.textContent).toBe("4");
  expect(doubled?.textContent).toBe("8");
});

test("dispatches validation events for invalid property values", async () => {
  class ValidatedFixture extends Wrec {
    static properties = {
      count: {
        type: Number,
        value: 1,
        // Validates count assignments.
        validate(value: number) {
          if (value < 0) return "must be at least zero";
        },
      },
    };
    declare count: number;

    static html = html`<p>this.count</p>`;
  }

  const elementName = getElementName("validated-fixture");
  ValidatedFixture.define(elementName);

  const element = document.createElement(elementName) as ValidatedFixture;
  const events: CustomEvent[] = [];
  element.addEventListener("validation", (event) => {
    events.push(event as CustomEvent);
  });

  document.body.appendChild(element);
  await waitForUpdates();

  element.count = 2;
  await waitForUpdates();

  expect(element.count).toBe(2);
  events.length = 0;

  element.count = -1;
  await waitForUpdates();

  expect(element.count).toBe(2);
  expect(events).toHaveLength(1);
  expect(events[0].detail).toEqual({
    errors: ["must be at least zero"],
    object: element,
    property: "count",
    value: -1,
    message: "must be at least zero",
    valid: false,
  });
});

test("dispatches validation events when component validation state changes", async () => {
  class ComponentValidatedFixture extends Wrec {
    static properties = {
      max: {
        type: Number,
        value: 0,
      },
      min: {
        type: Number,
        value: 0,
      },
    };
    declare max: number;
    declare min: number;

    static html = html`<p>this.min</p><p>this.max</p>`;

    // Validates the component property values.
    validate(props: Record<string, number>) {
      const errors = [];
      if (props.min < 0) errors.push("min must be at least zero");
      if (props.min > props.max) errors.push("min must be less than or equal to max");
      return errors;
    }
  }

  const elementName = getElementName("component-validated-fixture");
  ComponentValidatedFixture.define(elementName);

  const element = document.createElement(elementName) as ComponentValidatedFixture;
  const events: CustomEvent[] = [];
  element.addEventListener("validation", (event) => {
    events.push(event as CustomEvent);
  });

  document.body.appendChild(element);
  await waitForUpdates();

  element.min = 1;
  await waitForUpdates();

  expect(element.min).toBe(0);
  const invalidEvent = events.find((event) => event.detail.valid === false);
  expect(invalidEvent?.detail).toEqual({
    errors: ["min must be less than or equal to max"],
    message: "min must be less than or equal to max",
    object: element,
    property: "min",
    valid: false,
    value: 1,
  });

  element.max = 2;
  await waitForUpdates();

  expect(element.max).toBe(2);
  expect(element.min).toBe(0);
  const validEvent = events.find((event) => event.detail.valid === true && event.detail.property === "max");
  expect(validEvent?.detail).toEqual({
    errors: [],
    message: "",
    object: element,
    property: "max",
    valid: true,
    value: 2,
  });
});

test("does not redispatch component validation when a handler clears a message", async () => {
  class ValidationMessageFixture extends Wrec {
    static properties = {
      max: {
        type: Number,
        value: 0,
      },
      message: {
        type: String,
        value: "",
      },
      min: {
        type: Number,
        value: 0,
      },
    };
    declare max: number;
    declare message: string;
    declare min: number;

    static html = html`<p>this.message</p>`;

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("validation", this.handleValidation);
    }

    // Updates the validation message.
    handleValidation(event: Event) {
      this.message = (event as CustomEvent).detail.message;
    }

    // Validates the component property values.
    validate(props: Record<string, number>) {
      return props.min > props.max ? ["min must be less than or equal to max"] : [];
    }
  }

  const elementName = getElementName("validation-message-fixture");
  ValidationMessageFixture.define(elementName);

  const element = document.createElement(elementName) as ValidationMessageFixture;
  const events: CustomEvent[] = [];
  element.addEventListener("validation", (event) => {
    events.push(event as CustomEvent);
  });

  document.body.appendChild(element);
  await waitForUpdates();

  element.max = 3;
  await waitForUpdates();

  element.min = 4;
  await waitForUpdates();

  expect(element.min).toBe(0);
  expect(element.max).toBe(3);
  expect(element.message).toBe("min must be less than or equal to max");
  expect(
    events.some(
      (event) =>
        event.detail.property === "min" &&
        event.detail.value === 4 &&
        event.detail.message === "min must be less than or equal to max" &&
        event.detail.valid === false,
    ),
  ).toBe(true);

  element.min = 2;
  await waitForUpdates();

  expect(element.min).toBe(2);
  expect(element.message).toBe("");
  expect(
    events.some(
      (event) =>
        event.detail.property === "min" &&
        event.detail.value === 2 &&
        event.detail.message === "" &&
        event.detail.valid === true,
    ),
  ).toBe(true);
  const clearingEvent = events.find(
    (event) =>
      event.detail.property === "min" &&
      event.detail.value === 2 &&
      event.detail.message === "" &&
      event.detail.valid === true,
  );
  expect(clearingEvent?.detail).toMatchObject({
    errors: [],
    message: "",
    property: "min",
    valid: true,
    value: 2,
  });
});
