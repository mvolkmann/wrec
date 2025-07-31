import {expect, Locator, Page} from '@playwright/test';

export async function expectProperty(
  locator: Locator,
  propertyName: string,
  expectedValue: boolean | number | string
) {
  const value = await locator.evaluate(
    (el: Element, propertyName) => (el as any)[propertyName],
    propertyName
  );
  return expect(value).toBe(expectedValue);
}

export function getProperty(locator: Locator, name: string) {
  return locator.evaluate((el: HTMLElement, name) => (el as any)[name], name);
}

export function setAttribute(locator: Locator, name: string, value: string) {
  return locator.evaluate(
    (el: HTMLElement, [name, value]) => {
      el.setAttribute(name, value);
    },
    [name, value]
  );
}

export function setProperty(locator: Locator, name: string, value: unknown) {
  type Arg = {name: string; value: unknown};
  return locator.evaluate(
    (el: HTMLElement, {name, value}: Arg) => {
      (el as any)[name] = value;
    },
    {name, value}
  );
}

export function setInputRangeValue(locator: Locator, value: number) {
  return locator.evaluate((el: HTMLInputElement, value) => {
    // @ts-ignore We want to assign a number here because
    // wrec creates a property with a set method that expects a number.
    el.value = value;
    el.dispatchEvent(new Event('input', {bubbles: true}));
    el.dispatchEvent(new Event('change', {bubbles: true}));
  }, value);
}

export function waitForNextFrame(page: Page) {
  return page.evaluate(
    () => new Promise(resolve => requestAnimationFrame(resolve))
  );
}
