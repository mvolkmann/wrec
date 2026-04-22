import {createDeepProxy, proxyToPlainObject} from './proxies.js';

const inBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export type StateChange = {
  state: WrecState;
  statePath: string;
  oldValue: unknown;
  newValue: unknown;
};

export type ChangeCallback = (change: StateChange) => void;

type CallbackHolder = {
  callback: ChangeCallback;
  statePaths: string[];
};
type LooseObject = Record<string, unknown>;

class WrecError extends Error {}

// JavaScript does not allow creating a subclass of the Proxy class.
export class WrecState {
  static #stateMap: Map<string, WrecState> = new Map();

  static {
    if (inBrowser) {
      window.addEventListener('beforeunload', () => {
        // This persists the data in all WrecState objects
        // created with the "persist" option set to true
        // to sessionStorage as JSON strings so they can be
        // restored after the user refreshes the page.
        for (const [name, state] of this.#stateMap.entries()) {
          if (state.#persist) {
            const obj = proxyToPlainObject(state);
            sessionStorage.setItem('wrec-state-' + name, JSON.stringify(obj));
          }
        }
      });
    }
  }

  // This static method is useful for accessing a specific WrecState object
  // from the DevTools console.  For example:
  // state = WrecState.get('vault');
  //
  // WrecState object properties are accessed via nested Proxy objects
  // so all changes can be monitored.
  //
  // Properties can be directly modified as follows:
  // state.color = 'blue';
  // state.team.leader.name = 'Mark';
  static get(name: string) {
    return this.#stateMap.get(name);
  }

  #callbackHolders: CallbackHolder[] = [];
  #id = Symbol('objectId');
  #name: string;
  #persist: boolean;
  #proxy: LooseObject;

  // This tells TypeScript that it's okay to access properties by string keys.
  [key: string]: unknown;

  // Creates a state object with optional persistence and initial values.
  constructor(name: string, initial?: LooseObject);
  // Creates a state object with explicit persistence and optional initial values.
  constructor(name: string, persist: boolean, initial?: LooseObject);
  // Creates a state object with optional persistence and initial values.
  constructor(
    name: string,
    persistOrInitial?: boolean | LooseObject,
    initial?: LooseObject
  ) {
    const persist =
      typeof persistOrInitial === 'boolean' ? persistOrInitial : false;
    initial =
      typeof persistOrInitial === 'boolean' ? initial : persistOrInitial;

    if (!name) throw new WrecError('name cannot be empty');
    if (WrecState.#stateMap.has(name)) {
      throw new WrecError(`WrecState with name "${name}" already exists`);
    }

    this.#name = name;
    this.#persist = persist;
    this.#proxy = createDeepProxy({}, this.#notifyListeners.bind(this));

    // If there is existing state data in sessionStorage,
    // use that instead of the supplied initial data.
    if (persist && inBrowser) {
      const json = sessionStorage.getItem('wrec-state-' + name);
      const existingState = json ? JSON.parse(json) : undefined;
      if (existingState) initial = existingState;
    }

    if (initial) {
      for (const [key, value] of Object.entries(initial)) {
        this.addProperty(key, value);
      }
    }

    WrecState.#stateMap.set(name, this);
  }

  // Omit the `paths` argument to subscribe to all state changes.
  subscribe(callback: ChangeCallback, paths: string[] = []): () => void {
    if (this.#callbackHolders.some(holder => holder.callback === callback)) {
      throw new WrecError(
        'WrecState subscribe was passed a callback that was already added'
      );
    }
    const holder = {callback, statePaths: paths};
    this.#callbackHolders.push(holder);

    return () => {
      this.#callbackHolders = this.#callbackHolders.filter(
        existingHolder => existingHolder !== holder
      );
    };
  }

  addProperty(propName: string, initialValue: unknown) {
    Object.defineProperty(this, propName, {
      enumerable: true,
      get() {
        return this.#proxy[propName];
      },
      set(newValue: unknown) {
        this.#proxy[propName] = newValue;
      }
    });
    this.#proxy[propName] = initialValue;
  }

  get id() {
    return this.#id;
  }

  // Determines whether any subscribed state path matches the changed path.
  #hasMatchingStatePath(statePath: string, statePaths: string[]) {
    return statePaths.some(
      path =>
        statePath === path ||
        statePath.startsWith(path + '.') ||
        path.startsWith(statePath + '.')
    );
  }

  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log('WrecState:', this.#name);
    for (const [key, value] of Object.entries(this.#proxy)) {
      console.log(`  ${key} = ${JSON.stringify(value)}`);
    }
  }

  // Notifies subscribers whose watched paths overlap the changed state path.
  #notifyListeners(statePath: string, oldValue: unknown, newValue: unknown) {
    /* For debugging ...
    console.log(
      `state.ts: path ${statePath} changed from`,
      `${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`
    );
    */
    const change = {state: this, statePath, oldValue, newValue};

    for (const {callback, statePaths} of this.#callbackHolders) {
      if (
        statePaths.length === 0 ||
        this.#hasMatchingStatePath(statePath, statePaths)
      ) {
        callback(change);
      }
    }
  }
}

if (inBrowser) {
  const inDevelopment = process.env.NODE_ENV === 'development';
  if (inDevelopment) {
    // This makes the WrecState class available in the DevTools console.
    (window as any).WrecState = WrecState;
  }
}
