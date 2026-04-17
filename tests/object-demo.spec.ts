import {expect, Page, test} from '@playwright/test';

// Reads text content from the component shadow root.
async function getShadowText(page: Page, selector: string) {
  return page.locator('object-demo').evaluate((element, selector) => {
    return element.shadowRoot?.querySelector(selector)?.textContent ?? null;
  }, selector);
}

// Loads the object demo page before each test.
async function loadPage({page}: {page: Page}) {
  await page.goto('object-demo.html');
}

// Verifies nested object mutations update reactive DOM bindings.
async function verifyNestedObjectMutation({page}: {page: Page}) {
  const component = page.locator('object-demo');

  await expect(await getShadowText(page, '#name')).toBe('Ada');
  await expect(await getShadowText(page, '#count')).toBe('2');

  await component.evaluate((element: Element) => {
    const demo = element as any;
    demo.person.name = 'Grace';
    demo.person.stats.count = 3;
  });

  await expect(await getShadowText(page, '#name')).toBe('Grace');
  await expect(await getShadowText(page, '#count')).toBe('6');
}

test.beforeEach(loadPage);

test('nested object mutations update the DOM', verifyNestedObjectMutation);
