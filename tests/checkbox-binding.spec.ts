import {expect, Page, test} from '@playwright/test';
import {expectProperty, setProperty} from './util';

test.beforeEach(navigateToCheckboxBinding);

test('binds checkbox checked state in both directions', verifiesCheckboxBinding);
test(
  'throws when checkbox checked binding refers to a non-Boolean property',
  verifiesCheckboxBindingError
);

// Navigates to the checkbox binding example before each test.
async function navigateToCheckboxBinding({page}: {page: Page}) {
  await page.goto('checkbox-binding.html');
}

// Verifies checkbox checked bindings sync from property to DOM and back again.
async function verifiesCheckboxBinding({page}: {page: Page}) {
  const component = page.locator('checkbox-binding');
  const checkbox = component.locator('#moving');
  const status = component.locator('#status');

  await expectProperty(component, 'moving', true);
  await expect(checkbox).toBeChecked();
  await expect(status).toHaveText('moving');

  await setProperty(component, 'moving', false);
  await expect(checkbox).not.toBeChecked();
  await expect(status).toHaveText('stopped');

  await checkbox.click();
  await expectProperty(component, 'moving', true);
  await expect(status).toHaveText('moving');
}

// Verifies checkbox checked bindings reject non-Boolean component properties.
async function verifiesCheckboxBindingError({page}: {page: Page}) {
  const pageErrorPromise = page.waitForEvent('pageerror');

  await page.goto('checkbox-binding-error.html');

  const error = await pageErrorPromise;
  expect(error.message).toContain(
    'attribute "checked" refers to property "label" whose type is not Boolean'
  );
}
