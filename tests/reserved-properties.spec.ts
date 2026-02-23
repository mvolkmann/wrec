import {expect, Page, test} from '@playwright/test';

test('reserved-properties', async ({page}: {page: Page}) => {
  const errorPromise = page.waitForEvent('pageerror');
  await page.goto('http://localhost:5173/examples/reserved-properties.html');
  const error = await errorPromise;
  expect(error.message).toContain('"class" is a reserved property');
});
