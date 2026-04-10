import {expect, Page, test} from '@playwright/test';

test('throws when affected computed expressions form a cycle', async ({
  page
}: {
  page: Page;
}) => {
  const pageErrorPromise = page.waitForEvent('pageerror');

  await page.goto('computed-cycle.html');

  const error = await pageErrorPromise;
  expect(error.message).toContain(
    'computed properties form a cycle: first, second'
  );
  expect(error.stack).toContain('#getComputedUpdates');
});
