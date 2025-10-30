export type ChangeListener = {
  changed: (
    stateId: symbol,
    property: string,
    oldValue: unknown,
    newValue: unknown
  ) => void;
};

type ListenerHolder = {
  listenerRef: WeakRef<ChangeListener>;
  propertySet: Set<string>;
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
  #listenerHolders: ListenerHolder[] = [];
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
        if (newValue !== oldValue) {
          target[property] = newValue;
          this.#notifyListeners(property, oldValue, newValue);
        }
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
    // Check if the listener was already added.
    const listenerHolder = this.#listenerHolders.find(
      listenerHolder => listenerHolder.listenerRef.deref() === listener
    );
    if (listenerHolder) {
      // Just add the properties to the Set.
      const {propertySet} = listenerHolder;
      for (const property of properties) {
        propertySet.add(property);
      }
    } else {
      // Add a new listener.
      this.#listenerHolders.push({
        listenerRef: new WeakRef(listener),
        propertySet: new Set(properties)
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
    for (const [key, value] of Object.entries(this.#proxy)) {
      console.log(key, '=', JSON.stringify(value));
    }
  }

  #notifyListeners(property: string, oldValue: unknown, newValue: unknown) {
    const staleHolders: Set<ListenerHolder> = new Set();

    for (const holder of this.#listenerHolders) {
      const listener = holder.listenerRef.deref();
      if (listener instanceof HTMLElement) {
        const element = listener as HTMLElement;
        if (element.isConnected) {
          const {propertySet} = holder;
          if (propertySet.size === 0 || propertySet.has(property)) {
            listener.changed(this.#id, property, oldValue, newValue);
          }
        } else {
          // If the element is connected again later,
          // the State useState method must be called again
          // to re-add the element as a listener.
          staleHolders.add(holder);
        }
      } else {
        // This is reached if the WeakRef no longer refers to a valid object.
        staleHolders.add(holder);
      }
    }

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

if (process.env.NODE_ENV === 'development') {
  // This makes the State class available in the DevTools console.
  (window as any).State = State;
}
