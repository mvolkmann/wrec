import {expect, test} from '@playwright/test';
import {
  expectProperty,
  getProperty,
  setAttribute,
  waitForNextFrame
} from './util';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:5173/data-binding.html');
});

test('has title', async ({page}) => {
  await expect(page).toHaveTitle(/Data Binding Demo/);
});

test('colors', async ({page}) => {
  const dataBinding = page.locator('data-binding');
  const radioGroup = dataBinding.locator('radio-group');
  const selectList = dataBinding.locator('select-list');
  const span = dataBinding.locator('#selected-color');

  let color = await getProperty(dataBinding, 'color');
  await expectProperty(radioGroup, 'value', color);
  await expectProperty(selectList, 'value', color);
  await expect(span).toHaveText(color);

  // Click the "green" radio button.
  color = 'green';
  await radioGroup.locator(`input[value="${color}"]`).click();
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

  // Change the list of values in the binding-demo element.
  values = 'pink,yellow';
  await setAttribute(dataBinding, 'colors', values);
  await page.waitForTimeout(100);
  await testColors(values);

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  // Change the list of values in the radio-group element.
  values = 'white,gray,black';
  let labels = values.split(',').map(capitalize).join(',');
  await setAttribute(radioGroup, 'labels', labels);
  await setAttribute(radioGroup, 'values', values);
  await testColors(values);

  // Change the list of values in the select-list element.
  values = 'purple,orange,cyan,brown';
  labels = values.split(',').map(capitalize).join(',');
  await setAttribute(selectList, 'labels', labels);
  await setAttribute(selectList, 'values', values);
  await testColors(values);
});
