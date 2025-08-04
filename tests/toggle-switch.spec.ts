import {Page, test} from '@playwright/test';
import {expectProperty} from './util';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('http://localhost:5173/examples/toggle-switch.html');
});

test('toggle-switch', async ({page}: {page: Page}) => {
  const component = page.locator('toggle-switch');
  await expectProperty(component, 'checked', true);
  /*
  await component.click();
  await expectProperty(component, 'checked', false);
  await page.keyboard.press('Enter');
  await expectProperty(component, 'checked', true);
  await page.keyboard.press('Space');
  await expectProperty(component, 'checked', false);
  */
});
