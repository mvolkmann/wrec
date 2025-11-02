type LooseObject = Record<string, unknown>;

export function getPathValue(obj: LooseObject, path: string) {
  let value: LooseObject | any = obj;
  for (const key of path.split('.')) {
    value = value[key];
  }
  return value;
}

export function setPathValue(obj: LooseObject, path: string, value: unknown) {
  const keys = path.split('.');
  const lastIndex = keys.length - 1;
  let target: any = obj;
  keys.forEach((key, index) => {
    if (index === lastIndex) {
      target[key] = value;
    } else {
      target = target[key];
    }
  });
}
