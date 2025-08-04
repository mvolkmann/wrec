// JavaScript does not allow creating a subclass of the Proxy class.

export type ChangeListener = {
  changed: (property: string, oldValue: unknown, newValue: unknown) => void;
};

type ListenerData = {
  listener: ChangeListener;
  propertySet?: Set<string>;
};

type LooseObject = Record<string, unknown>;

export class State {
  #listeners: ListenerData[] = [];
  #proxy: LooseObject;

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

  #notifyListeners(property: string, oldValue: unknown, newValue: unknown) {
    for (const {listener, propertySet} of this.#listeners) {
      if (!propertySet || propertySet.has(property)) {
        listener.changed(property, oldValue, newValue);
      }
    }
  }

  get(property: string) {
    return this.#proxy[property];
  }

  removeListener(listener: ChangeListener) {
    this.#listeners = this.#listeners.filter(obj => obj.listener !== listener);
  }

  set(property: string, newValue: unknown) {
    const oldValue = this.#proxy[property];
    if (newValue !== oldValue) this.#proxy[property] = newValue;
  }
}
