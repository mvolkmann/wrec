export function getPathValue(obj: Record<string, any>, path: string) {
  let value = obj;
  for (const key of path.split('.')) {
    value = value[key];
  }
  return value;
}

/**
 * If path contains more than one key,
 * this sets the value of the first key in the path to a clone of its value.
 * Then it sets the value at the given path to the given value.
 * This is to ensure that Proxy handlers are triggered correctly.
 */
export function setPathValue(
  obj: Record<string, any>,
  path: string,
  value: unknown
) {
  const keys = path.split('.');
  if (keys.length === 1) {
    obj[path] = value;
  } else {
    const firstKey = keys[0];
    const intermediateKeys = keys.slice(1, -1);
    const lastKey = keys[keys.length - 1];

    const clone = structuredClone(obj[firstKey]);
    let target = clone;
    for (const key of intermediateKeys) {
      target = target[key];
    }
    target[lastKey] = value;
    obj[firstKey] = clone;
  }
}
