import {expect, Page, test} from '@playwright/test';
import {WrecState} from '../src/wrec-state';
import {showBrowserConsole} from './util';

test.beforeEach(async ({page}: {page: Page}) => {
  showBrowserConsole(page);
  await page.goto('http://localhost:5173/examples/state-demo.html');
});

test('hello-world', async ({page}: {page: Page}) => {
  const liLocator = page.locator('labeled-input');
  const input = liLocator.locator('input');
  const hwLocator = page.locator('hello-world');

  await page.waitForFunction(() => typeof WrecState !== 'undefined');
  const state = await page.evaluate(() => {
    return WrecState.get('demo');
  });
  console.log('state.spec.ts: state =', state);

  async function assertName(name: string) {
    //await expect(state?.name).toBe(name);
    await expect(input).toHaveValue(name);
    await expect(hwLocator).toHaveText(`Hello, ${name}!`);
  }

  await assertName('World');

  await input.fill('Mark');
  await input.press('Enter');
  await assertName('Mark');

  const button = page.locator('button');
  await button.click();
  await assertName('World');
});
