import {expect, test} from '@playwright/test';
import {
  expectAttribute,
  expectProperty,
  getProperty,
  setProperty,
  waitForNextFrame
} from './util';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:5173/examples/data-binding.html');
});

test('has title', async ({page}) => {
  await expect(page).toHaveTitle(/Data Binding Demo/);
});

test('colors', async ({page}) => {
  const dataBinding = page.locator('data-binding');
  const radioGroup = dataBinding.locator('radio-group');
  const selectList = dataBinding.locator('select-list');
  const span = dataBinding.locator('#selected-color');

  await waitForNextFrame(page); // unclear why this is needed
  let color = await getProperty(dataBinding, 'color');
  await expectProperty(radioGroup, 'value', color);
  await expectProperty(selectList, 'value', color);
  await expect(span).toHaveText(color);

  // Click the "green" radio button.
  color = 'green';
  await radioGroup.locator(`input[value="${color}"]`).click();
  await waitForNextFrame(page);
  await expectProperty(radioGroup, 'value', color);
  await expectProperty(selectList, 'value', color);
  await expect(span).toHaveText(color);

  // Select the "red" option.
  color = 'red';
  const select = selectList.locator('select');
  await select.selectOption(color);
  await waitForNextFrame(page);
  await expectProperty(radioGroup, 'value', color);
  await expectProperty(selectList, 'value', color);
  await expect(span).toHaveText(color);

  async function testColors(values: string) {
    await waitForNextFrame(page);

    // The first option should be selected.
    const color = values.split(',')[0];
    await expectProperty(radioGroup, 'value', color);
    await expectProperty(selectList, 'value', color);
    await expect(span).toHaveText(color);

    let labels = await getProperty(dataBinding, 'labels');
    labels = labels.split(',');

    // Verify the radio buttons.
    const colors = values.split(',');
    const divs = await radioGroup.locator('div > div');
    let count = await divs.count();
    expect(count).toBe(colors.length);
    for (let i = 0; i < count; i++) {
      const div = divs.nth(i);
      const text = await div.locator('label').textContent();
      await expect(text).toBe(labels[i]);
    }

    // Verify the option elements inside the select element.
    const optionElements = selectList.locator('option');
    count = await optionElements.count();
    expect(count).toBe(colors.length);
    for (let i = 0; i < count; i++) {
      const optionElement = optionElements.nth(i);
      const text = await optionElement.textContent();
      await expect(text).toBe(labels[i]);
    }
  }

  let values = '';

  // Change the list of values in the data-binding element.
  values = 'pink,yellow';
  await setProperty(dataBinding, 'colors', values);
  await testColors(values);

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  // Change the list of values in the radio-group element.
  values = 'white,gray,black';
  let labels = values.split(',').map(capitalize).join(',');
  await setProperty(radioGroup, 'labels', labels);
  await setProperty(radioGroup, 'values', values);
  await testColors(values);

  // Change the list of values in the select-list element.
  values = 'purple,orange,cyan,brown';
  labels = values.split(',').map(capitalize).join(',');
  await setProperty(selectList, 'labels', labels);
  await setProperty(selectList, 'values', values);
  await testColors(values);
});

test('disabled', async ({page}) => {
  const dataBinding = page.locator('data-binding');
  const numberSlider = dataBinding.locator('number-slider');
  const radioGroup = dataBinding.locator('radio-group');
  const selectList = dataBinding.locator('select-list');
  const toggleSwitch = dataBinding.locator('toggle-switch');

  const enabled = await getProperty(dataBinding, 'enabled');
  expect(enabled).toBe(true);
  await expectAttribute(radioGroup, 'disabled', false);
  await expectAttribute(selectList, 'disabled', false);
  await expectAttribute(numberSlider, 'disabled', false);

  await toggleSwitch.click();
  // Wait for the enabled property of the data-binding element
  // to be set to false.
  await expect(dataBinding).toHaveJSProperty('enabled', false);
  await expectAttribute(radioGroup, 'disabled', true);
  await expectAttribute(selectList, 'disabled', true);
  await expectAttribute(numberSlider, 'disabled', true);
});
