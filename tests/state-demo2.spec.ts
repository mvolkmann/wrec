import {expect, Page, test} from '@playwright/test';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('state-demo2/index.html');
});

test('shares persisted state across pages', async ({page}: {page: Page}) => {
  const componentOne = page.locator('component-one');
  const componentTwo = page.locator('component-two');
  const nameInput = componentOne.locator('input');
  const greeting = componentTwo.locator('p');
  const blueRadio = componentTwo.locator('input[value="blue"]');

  await expect(nameInput).toHaveValue('World');
  await expect(greeting).toContainText('Hello, World!');

  await nameInput.fill('Tami');
  await nameInput.press('Enter');
  await expect(greeting).toContainText('Hello, Tami!');

  await blueRadio.click();
  await expect(blueRadio).toBeChecked();

  await page.getByRole('link', {name: 'Next'}).click();
  await expect(page).toHaveURL(/state-demo2\/other-page\.html$/);
  await expect(page.locator('#color')).toHaveText('blue');
  await expect(page.locator('#name')).toHaveText('Tami');
});

test('removes a state consumer without breaking later updates', async ({
  page
}: {
  page: Page;
}) => {
  const componentOne = page.locator('component-one');
  const nameInput = componentOne.locator('input');

  await page.locator('#remove-btn').click();
  await expect(page.locator('component-two')).toHaveCount(0);

  await nameInput.fill('Sky');
  await nameInput.press('Enter');

  await page.getByRole('link', {name: 'Next'}).click();
  await expect(page.locator('#color')).toHaveText('red');
  await expect(page.locator('#name')).toHaveText('Sky');
});
