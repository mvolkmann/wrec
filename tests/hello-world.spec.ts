import {expect, Page, test} from '@playwright/test';
import {setAttribute} from './util';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('http://localhost:5173/examples/hello-world.html');
});

test('hello-world', async ({page}: {page: Page}) => {
  let component = page.locator('hello-world').first();
  let p = component.locator('p');
  await expect(p).toHaveText('Hello, World. Shouting WORLD!');

  component = page.locator('hello-world').last();
  p = component.locator('p');
  await expect(p).toHaveText('Hello, Mark. Shouting MARK!');

  await setAttribute(component, 'name', 'Tami');
  await expect(p).toHaveText('Hello, Tami. Shouting TAMI!');
});
