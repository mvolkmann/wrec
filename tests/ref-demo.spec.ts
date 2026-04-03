import {expect, Page, test} from '@playwright/test';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('ref-demo.html');
});

test('ref assigns matching HTMLElement property', async ({page}: {page: Page}) => {
  const component = page.locator('ref-demo');
  const input = component.locator('input');

  await expect(input).toHaveAttribute('data-ref-ready', 'true');

  const matches = await component.evaluate(el => {
    const component = el as any;
    return component.inputRef === component.shadowRoot.querySelector('input');
  });
  expect(matches).toBe(true);
});
