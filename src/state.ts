import {createDeepProxy, proxyToPlainObject} from './proxies.js';

export type ChangeListener = {
  changed: (
    statePath: string,
    componentProperty: string,
    newValue: unknown,
    oldValue: unknown,
    state: State
  ) => void;
};

type ListenerHolder = {
  listenerRef: WeakRef<ChangeListener>;
  propertyMap: Record<string, string>;
};

type LooseObject = Record<string, unknown>;

class WrecError extends Error {}

const inBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

// JavaScript does not allow creating a subclass of the Proxy class.
export class State {
  static #stateMap: Map<string, State> = new Map();

  static {
    if (inBrowser) {
      window.addEventListener('beforeunload', () => {
        // This persists the data in all State objects
        // to sessionStorage as JSON strings
        // so it can be restored after the user refreshes the page.
        for (const [name, state] of State.#stateMap.entries()) {
          const obj = proxyToPlainObject(state);
          sessionStorage.setItem('wrec-state-' + name, JSON.stringify(obj));
        }
      });
    }
  }

  // This static method is useful for accessing a specific State object
  // from the DevTools console.  For example:
  // state = State.get('vault');
  //
  // State object properties are accessed via nested Proxy objects
  // so all changes can be monitored.
  //
  // Properties can be directly modified as follows:
  // state.color = 'blue';
  // state.team.leader.name = 'Mark';
  static get(name: string) {
    return State.#stateMap.get(name);
  }

  #id = Symbol('objectId');
  // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
  // because there is no way to iterate over the keys of a WeakMap.
  #listenerHolders: ListenerHolder[] = [];
  #name: string;
  #proxy: LooseObject;

  // This tells TypeScript that it's okay to access properties by string keys.
  [key: string]: unknown;

  constructor(name: string, initial?: LooseObject) {
    if (!name) throw new WrecError('name cannot be empty');
    if (State.#stateMap.has(name)) {
      throw new WrecError(`State with name "${name}" already exists`);
    }

    this.#name = name;
    this.#proxy = createDeepProxy({}, this.#notifyListeners.bind(this));

    // If there is existing state data in sessionStorage,
    // use that instead of the supplied initial data.
    const json = sessionStorage.getItem('wrec-state-' + name);
    const existingState = json ? JSON.parse(json) : undefined;
    if (existingState) initial = existingState;

    if (initial) {
      for (const [key, value] of Object.entries(initial)) {
        this.addProperty(key, value);
      }
    }

    State.#stateMap.set(name, this);
  }

  /**
   * @param listener - object that has a "changed" method
   * @param map - map from state property paths to component properties
   */
  addListener(listener: ChangeListener, map: Record<string, string> = {}) {
    // Check if the listener was already added.
    const listenerHolder = this.#listenerHolders.find(
      listenerHolder => listenerHolder.listenerRef.deref() === listener
    );
    if (listenerHolder) {
      // Add properties to existing propertyMap.
      const {propertyMap} = listenerHolder;
      for (const [key, value] of Object.entries(map)) {
        propertyMap[key] = value;
      }
    } else {
      // Add a new listener.
      this.#listenerHolders.push({
        listenerRef: new WeakRef(listener),
        propertyMap: map
      });
    }
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

  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log('State:', this.#name);
    for (const [key, value] of Object.entries(this.#proxy)) {
      console.log(`  ${key} = ${JSON.stringify(value)}`);
    }
  }

  #notifyListeners(statePath: string, oldValue: unknown, newValue: unknown) {
    /* For debugging ...
    console.log(
      `state.ts: path ${statePath} changed from`,
      `${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`
    );
    */
    const staleHolders: Set<ListenerHolder> = new Set();

    for (const holder of this.#listenerHolders) {
      const listener = holder.listenerRef.deref();

      // If the WeakRef no longer refers to a valid object ...
      if (!listener) {
        staleHolders.add(holder);
        // If the listener is an HTMLElement
        // that is disconnected from the DOM ...
      } else if (
        inBrowser &&
        listener instanceof HTMLElement &&
        !listener.isConnected
      ) {
        staleHolders.add(holder);
      } else {
        const {propertyMap} = holder;
        const keys = Object.keys(propertyMap);
        if (keys.length === 0 || keys.includes(statePath)) {
          listener.changed(
            statePath,
            propertyMap[statePath],
            newValue,
            oldValue,
            this
          );
        }
      }
    }

    // WARNING: If the element is connected again later,
    // the State useState method must be called again
    // to re-add the element as a listener.
    this.#listenerHolders = this.#listenerHolders.filter(
      holder => !staleHolders.has(holder)
    );
  }

  removeListener(listener: ChangeListener) {
    this.#listenerHolders = this.#listenerHolders.filter(holder => {
      return holder.listenerRef.deref() !== listener;
    });
  }
}

if (inBrowser) {
  const inDevelopment = process.env.NODE_ENV === 'development';
  if (inDevelopment) {
    // This makes the State class available in the DevTools console.
    (window as any).State = State;
  }
}
