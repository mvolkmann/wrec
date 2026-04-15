import {expect, Page, test} from '@playwright/test';
import {expectProperty, setProperty} from './util';

test.beforeEach(navigateToRadioBinding);

test('binds radio checked state in both directions', verifiesRadioBinding);
test(
  'throws when radio checked binding refers to a non-String property',
  verifiesRadioBindingError
);

// Navigates to the radio binding example before each test.
async function navigateToRadioBinding({page}: {page: Page}) {
  await page.goto('radio-binding.html');
}

// Verifies radio checked bindings sync from property to DOM and back again.
async function verifiesRadioBinding({page}: {page: Page}) {
  const component = page.locator('radio-binding');
  const red = component.locator('#red');
  const green = component.locator('#green');
  const status = component.locator('#status');

  await expectProperty(component, 'choice', 'green');
  await expect(red).not.toBeChecked();
  await expect(green).toBeChecked();
  await expect(status).toHaveText('green');

  await setProperty(component, 'choice', 'red');
  await expect(red).toBeChecked();
  await expect(green).not.toBeChecked();
  await expect(status).toHaveText('red');

  await green.click();
  await expectProperty(component, 'choice', 'green');
  await expect(status).toHaveText('green');
}

// Verifies radio checked bindings reject non-String component properties.
async function verifiesRadioBindingError({page}: {page: Page}) {
  const pageErrorPromise = page.waitForEvent('pageerror');

  await page.goto('radio-binding-error.html');

  const error = await pageErrorPromise;
  expect(error.message).toContain(
    'attribute "checked" refers to property "enabled" whose type is not String'
  );
}
