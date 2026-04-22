import {JSDOM} from 'jsdom';
import {afterAll, afterEach, beforeAll, expect, test, vi} from 'vitest';

let dom: JSDOM;
let elementIndex = 0;
type WrecModule = typeof import('./wrec.js');
let html: WrecModule['html'];
let Wrec: WrecModule['Wrec'];
let WrecState: WrecModule['WrecState'];

const globalNames = [
  'CSSStyleRule',
  'CustomEvent',
  'customElements',
  'document',
  'Element',
  'Event',
  'FormData',
  'HTMLButtonElement',
  'HTMLElement',
  'HTMLFieldSetElement',
  'HTMLInputElement',
  'HTMLSelectElement',
  'HTMLStyleElement',
  'HTMLTemplateElement',
  'HTMLTextAreaElement',
  'Node',
  'sessionStorage',
  'ShadowRoot',
  'window'
] as const;
const originalGlobals = new Map<string, {hadValue: boolean; value: unknown}>();

beforeAll(async () => {
  vi.resetModules();
  dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost'
  });
  assignDomGlobals(dom.window);
  ({html, Wrec, WrecState} = await import('./wrec.js'));
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
      value: (globalThis as Record<string, unknown>)[name]
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
  await new Promise(resolve => setTimeout(resolve, 0));
}

test('renders dynamic HTML and wires events inside injected markup', async () => {
  class DynamicMarkupFixture extends Wrec {
    static properties = {
      count: {type: Number, value: 0},
      markup: {
        type: String,
        value: '<button id="inner" onClick="increment" type="button">+</button>'
      }
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

  const elementName = getElementName('dynamic-markup-fixture');
  DynamicMarkupFixture.define(elementName);

  const element = document.createElement(elementName) as DynamicMarkupFixture;
  document.body.appendChild(element);
  await waitForUpdates();

  const button = element.shadowRoot?.querySelector(
    '#inner'
  ) as HTMLButtonElement | null;
  const content = element.shadowRoot?.querySelector('#content');
  const count = element.shadowRoot?.querySelector('#count');

  expect(button).not.toBeNull();
  expect(content?.innerHTML).toContain('id="inner"');
  expect(count?.textContent).toBe('0');

  button?.click();
  await waitForUpdates();

  expect(element.count).toBe(1);
  expect(count?.textContent).toBe('1');
});

test('syncs component state from WrecState subscriptions', async () => {
  class StateFixture extends Wrec {
    static properties = {
      name: {type: String, value: 'unknown'}
    };

    static html = html`<p id="name">this.name</p>`;

    declare name: string;
  }

  const elementName = getElementName('state-fixture');
  StateFixture.define(elementName);

  const stateName = `runtime-state-${elementName}`;
  const state = new WrecState(stateName, {name: 'World'}) as WrecState & {
    name: string;
  };
  const element = document.createElement(elementName) as StateFixture;

  element.useState(state);
  document.body.appendChild(element);
  await waitForUpdates();

  const name = element.shadowRoot?.querySelector('#name');
  expect(name?.textContent).toBe('World');

  state.name = 'Alice';
  await waitForUpdates();

  expect(element.name).toBe('Alice');
  expect(name?.textContent).toBe('Alice');
});

test('disconnects cleanly and unsubscribes from WrecState updates', async () => {
  class DisconnectFixture extends Wrec {
    static properties = {
      name: {type: String, value: 'unknown'}
    };
    static html = html`<p id="name">this.name</p>`;
    declare name: string;
  }

  const elementName = getElementName('disconnect-fixture');
  DisconnectFixture.define(elementName);

  const stateName = `runtime-state-${elementName}`;
  const state = new WrecState(stateName, {name: 'World'}) as WrecState & {
    name: string;
  };
  const element = document.createElement(elementName) as DisconnectFixture;

  element.useState(state);
  document.body.appendChild(element);
  await waitForUpdates();

  expect(() => {
    document.body.removeChild(element);
  }).not.toThrow();

  state.name = 'Alice';
  await waitForUpdates();

  expect(element.name).toBe('World');
});

test('updates computed content when a property changes', async () => {
  class CounterFixture extends Wrec {
    static properties = {
      count: {type: Number, value: 1},
      doubled: {type: Number, computed: 'this.count * 2'}
    };

    static html = html`
      <p id="count">this.count</p>
      <p id="doubled">this.doubled</p>
    `;

    declare count: number;
    declare doubled: number;
  }

  const elementName = getElementName('counter-fixture');
  CounterFixture.define(elementName);

  const element = document.createElement(elementName) as CounterFixture;
  document.body.appendChild(element);
  await waitForUpdates();

  const count = element.shadowRoot?.querySelector('#count');
  const doubled = element.shadowRoot?.querySelector('#doubled');

  expect(count?.textContent).toBe('1');
  expect(doubled?.textContent).toBe('2');

  element.count = 4;
  await waitForUpdates();

  expect(count?.textContent).toBe('4');
  expect(doubled?.textContent).toBe('8');
});
