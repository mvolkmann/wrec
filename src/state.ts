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

// JavaScript does not allow creating a subclass of the Proxy class.
export class State {
  #id = Symbol('objectId');
  #listeners: ListenerData[] = [];
  #proxy: LooseObject;

  // This tells TypeScript that it's okay to access properties by string keys.
  [key: string]: any;

  constructor() {
    const handler = {
      set: (target: LooseObject, property: string, newValue: unknown) => {
        const oldValue = target[property];
        target[property] = newValue;
        this.#notifyListeners(property, oldValue, newValue);
        return true;
      }
    };
    this.#proxy = new Proxy<LooseObject>({}, handler);
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
