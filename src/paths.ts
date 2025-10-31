export function getPathValue(obj: Record<string, any>, path: string) {
  let value = obj;
  for (const key of path.split('.')) {
    value = value[key];
  }
  return value;
}

export function setPathValue(
  obj: Record<string, any>,
  path: string,
  value: unknown
) {
  const keys = path.split('.');
  const lastIndex = keys.length - 1;
  keys.forEach((key, index) => {
    if (index === lastIndex) {
      obj[key] = value;
    } else {
      obj = obj[key];
    }
  });
}
