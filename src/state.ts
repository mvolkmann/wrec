export type ChangeListener = {
  changed: (
    stateId: symbol,
    property: string,
    oldValue: unknown,
    newValue: unknown
  ) => void;
};

type ListenerData = {
  listener: ChangeListener;
  propertySet?: Set<string>;
};

type LooseObject = Record<string, unknown>;

class WrecError extends Error {}

// JavaScript does not allow creating a subclass of the Proxy class.
export class State {
  static #stateMap: Map<string, State> = new Map();

  // This is useful for accessing a specific State object
  // from the DevTools console.  For example:
  // state = State.get('vault');
  static get(name: string) {
    return State.#stateMap.get(name);
  }

  #id = Symbol('objectId');
  #listeners: ListenerData[] = [];
  #proxy: LooseObject;

  // This tells TypeScript that it's okay to access properties by string keys.
  [key: string]: any;

  constructor(name: string, initial?: LooseObject) {
    if (!name) throw new WrecError('name cannot be empty');
    if (State.#stateMap.has(name)) {
      throw new WrecError(`State with name "${name}" already exists`);
    }

    const handler = {
      set: (target: LooseObject, property: string, newValue: unknown) => {
        const oldValue = target[property];
        target[property] = newValue;
        this.#notifyListeners(property, oldValue, newValue);
        return true;
      }
    };
    this.#proxy = new Proxy<LooseObject>({}, handler);

    if (initial) {
      for (const [key, value] of Object.entries(initial)) {
        this.addProperty(key, value);
      }
    }

    State.#stateMap.set(name, this);
  }

  /**
   * @param listener - object that has a "changed" method
   * @param properties - array of properties of interest
   */
  addListener(listener: ChangeListener, properties: string[] = []) {
    const propertySet = new Set(properties);
    this.#listeners.push({listener, propertySet});
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
    for (const [key, value] of Object.entries(this.#proxy)) {
      console.log(key, '=', JSON.stringify(value));
    }
  }

  #notifyListeners(property: string, oldValue: unknown, newValue: unknown) {
    for (const {listener, propertySet} of this.#listeners) {
      if (!propertySet || propertySet.has(property)) {
        listener.changed(this.#id, property, oldValue, newValue);
      }
    }
  }

  removeListener(listener: ChangeListener) {
    this.#listeners = this.#listeners.filter(obj => obj.listener !== listener);
  }
}

if (process.env.NODE_ENV === 'development') {
  // This makes the State class available in the DevTools console.
  (window as any).State = State;
}
