type LooseObject = Record<string, unknown>;
type PathTarget = LooseObject | unknown[];

// Gets a value from an object or array using a dot-separated path.
export function getPathValue(obj: LooseObject, path: string) {
  const keys = parsePath(path);
  let value: unknown = obj;

  for (const key of keys) {
    if (!isObjectLike(value)) return undefined;
    value = value[key as keyof typeof value];
  }

  return value;
}

// Determines whether a value can be traversed by path segments.
function isObjectLike(
  value: unknown
): value is PathTarget {
  return typeof value === 'object' && value !== null;
}

// Parses and validates a dot-separated path.
function parsePath(path: string): string[] {
  path = path.trim();
  if (!path) throw new Error('path cannot be empty');

  const keys = path.split('.');
  if (keys.some(key => key.length === 0)) {
    throw new Error(`path "${path}" contains an empty segment`);
  }

  return keys;
}

// Sets a value in an object or array using a dot-separated path.
export function setPathValue(obj: LooseObject, path: string, value: unknown) {
  const keys = parsePath(path);
  const lastIndex = keys.length - 1;
  let target: unknown = obj;

  keys.forEach((key, index) => {
    if (!isObjectLike(target)) {
      const parentPath = keys.slice(0, index).join('.');
      throw new Error(
        `cannot set path "${path}": "${parentPath}" is not object-like`
      );
    }

    const indexableTarget = target as Record<string, unknown>;
    if (index === lastIndex) {
      indexableTarget[key] = value;
      return;
    }

    const next = indexableTarget[key];
    if (next === undefined) {
      const missingPath = keys.slice(0, index + 1).join('.');
      throw new Error(`cannot set path "${path}": missing "${missingPath}"`);
    }

    if (!isObjectLike(next)) {
      const parentPath = keys.slice(0, index + 1).join('.');
      throw new Error(
        `cannot set path "${path}": "${parentPath}" is not object-like`
      );
    }

    target = next;
  });
}
