type LooseObject = Record<string, unknown>;

export type ProxyCallback = (
  keyPath: string,
  oldValue: unknown,
  newValue: unknown
) => void;

/**
 * Creates a recursive Proxy to monitor deep property changes,
 * passing the dot-separated path to the callback.
 * @param {Object} target object to proxy
 * @param {ProxyCallback} callback function to call when any property changes
 * @param {string} [path=''] current path prefix, used internally for recursion
 * @returns {Proxy} deep proxy
 */
export function createDeepProxy(
  target: LooseObject,
  callback: ProxyCallback,
  path = ''
): LooseObject {
  // Use a WeakMap to cache proxies and
  // avoid infinite recursion or memory leaks.
  const proxyCache = new WeakMap();

  const deepHandler = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(target: Record<string, any>, key: string) {
      const value = Reflect.get(target, key);

      // If the value is a primitive, return it.
      if (value === null || typeof value !== 'object') return value;

      // If a proxy for this object has already been created, return it.
      const proxy = proxyCache.get(value);
      if (proxy) return proxy;

      // Wrap the nested object in a new proxy and return it.
      const newPath = path ? `${path}.${key}` : key;
      const nestedProxy = createDeepProxy(value, callback, newPath);
      proxyCache.set(value, nestedProxy);
      return nestedProxy;
    },

    // Intercept property writes.
    set(target: Record<string, any>, key: string, newValue: any) {
      const oldValue = Reflect.get(target, key);
      if (oldValue !== newValue) {
        Reflect.set(target, key, newValue);
        const newPath = path ? `${path}.${key}` : key;
        callback(newPath, oldValue, newValue);
      }
      return true;
    }
  };

  return new Proxy(target, deepHandler);
}

// This converts a deep proxy to a plain object.
export function proxyToPlainObject(obj: LooseObject): LooseObject {
  const clone: LooseObject = {};
  for (const [key, value] of Object.entries(obj)) {
    const isObject = typeof value === 'object' && value !== null;
    clone[key] = isObject ? proxyToPlainObject(value as LooseObject) : value;
  }
  return clone;
}
