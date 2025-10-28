import {expect, Page, test} from '@playwright/test';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('http://localhost:5173/examples/state-demo.html');
});

test('hello-world', async ({page}: {page: Page}) => {
  const liLocator = page.locator('labeled-input');
  const input = liLocator.locator('input');
  await expect(input).toHaveValue('World');

  const hwLocator = page.locator('hello-world');
  await expect(hwLocator).toHaveText('Hello, World!');

  const name = 'Mark';
  await input.fill(name);
  await input.press('Enter');
  await expect(hwLocator).toHaveText(`Hello, ${name}!`);

  const button = page.locator('button');
  await button.click();
  await expect(hwLocator).toHaveText('Hello, World!');
});
