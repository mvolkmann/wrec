import {expect, Page, test} from '@playwright/test';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('slots-demo.html');
});

test('renders slotted content and reacts to host attributes', async ({
  page
}: {
  page: Page;
}) => {
  const component = page.locator('slots-demo');

  await expect(page.getByText('Breaking News')).toBeVisible();
  await expect(page.getByText(/Object Computing, Inc\./)).toBeVisible();
  await expect(page.getByText(/Wrec is a new library/)).toContainText(
    'Wrec is a new library for building web components'
  );

  await expect(component).toHaveCSS('width', '192px');
});
