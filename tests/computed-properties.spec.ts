import {expect, Page, test} from '@playwright/test';
import {expectProperty, setProperty} from './util';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('rectangle-area.html');
});

test('computed property cannot be set directly', async ({
  page
}: {
  page: Page;
}) => {
  const component = page.locator('rectangle-area');
  await expectProperty(component, 'area', 50);
  await expect(async () => {
    await setProperty(component, 'area', 99);
  }).rejects.toThrow(
    'component rectangle-area, attribute "area" is a computed property and cannot be set directly'
  );
  await expectProperty(component, 'area', 50);
});
