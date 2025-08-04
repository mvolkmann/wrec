import {expect, Page, test} from '@playwright/test';
import {expectProperty, setProperty, waitForNextFrame} from './util';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('http://localhost:5173/examples/number-bind.html');
});

test('number-bind', async ({page}: {page: Page}) => {
  const numberBind = page.locator('number-bind');
  await expect(numberBind).toBeAttached();

  const numberInput = numberBind.locator('number-input');
  await expect(numberInput).toBeAttached();

  const input = numberInput.locator('input');
  const decBtn = numberInput.locator('button').first();
  await expect(decBtn).toHaveText('-');
  const incBtn = numberInput.locator('button').last();
  await expect(incBtn).toHaveText('+');

  const numberSlider = numberBind.locator('number-slider');
  await expect(numberSlider).toBeAttached();

  const span = numberBind.locator('p > span');
  await expect(span).toBeAttached();

  async function testNumber(expected: number) {
    await waitForNextFrame(page);
    await expectProperty(numberInput, 'value', expected);
    await expectProperty(numberSlider, 'value', expected);
    await expect(span).toHaveText(String(expected));
  }

  let number = 5; // initial value
  await testNumber(number);

  // Click the "+" and "-" buttons of the number-input element.
  await incBtn.click();
  await testNumber(number + 1);

  await decBtn.click();
  await decBtn.click();
  await testNumber(number - 1);

  // Enter a new number in the input element of the number-input element.
  let expected = 19;
  await input.fill(String(expected));
  await input.press('Enter');
  await waitForNextFrame(page);
  await testNumber(expected);

  // Drag the slider.
  expected = 100;
  //TODO: Why doesn't this work instead of modifying a number-slider property?
  //await setAttribute(rangeInput, "value", expected);
  await setProperty(numberSlider, 'value', expected);
  await testNumber(expected);
});
