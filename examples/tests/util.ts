import {expect, Locator} from '@playwright/test';

export async function expectProperty(
  locator: Locator,
  propertyName: string,
  expectedValue: boolean | number | string
) {
  const value = await locator.evaluate(
    (el, {propertyName}) => el[propertyName],
    {propertyName}
  );
  return expect(value).toBe(expectedValue);
}

export function getProperty(locator: Locator, name: string) {
  return locator.evaluate((el, {name}) => el[name], {name});
}

export function setAttribute(locator: Locator, name: string, value: string) {
  return locator.evaluate((el, {name, value}) => el.setAttribute(name, value), {
    name,
    value
  });
}

export function setProperty(locator: Locator, name: string, value: string) {
  return locator.evaluate((el, {name, value}) => (el[name] = value), {
    name,
    value
  });
}

export function setInputRangeValue(locator, value) {
  return locator.evaluate((el, value) => {
    el.value = value;
    el.dispatchEvent(new Event('input', {bubbles: true}));
    el.dispatchEvent(new Event('change', {bubbles: true}));
  }, value);
}

export function waitForNextFrame(page) {
  return page.evaluate(
    () => new Promise(resolve => requestAnimationFrame(resolve))
  );
}
