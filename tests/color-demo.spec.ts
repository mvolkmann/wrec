import {expect, Locator, Page, test} from '@playwright/test';
import {setInputRangeValue, waitForNextFrame} from './util';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('http://localhost:5173/examples/color-demo.html');
});

test('has title', async ({page}: {page: Page}) => {
  await expect(page).toHaveTitle(/Color Demo/);
});

test('sliders', async ({page}: {page: Page}) => {
  const colorPicker = page.locator('color-picker');
  const sliders = colorPicker.locator('number-slider');
  await expect(sliders).toHaveCount(3);
  const redSlider = sliders.nth(0);
  await expect(redSlider).toBeAttached();
  const greenSlider = sliders.nth(1);
  await expect(greenSlider).toBeAttached();
  const blueSlider = sliders.nth(2);
  await expect(blueSlider).toBeAttached();

  const sizeSlider = page.locator("number-slider[label='Size']");
  await expect(sizeSlider).toBeAttached();

  const p = page.locator('p');
  await expect(p).toHaveText('This is a test.');

  let red = 0;
  let green = 0;
  let blue = 0;

  async function testColor(slider: Locator, value: number) {
    await setInputRangeValue(slider, value);

    // It is unclear why this must be called three times.
    // Is it because the setInputRangeValue function dispatches two events?
    await waitForNextFrame(page);
    await waitForNextFrame(page);
    await waitForNextFrame(page);

    const expected = `rgb(${red}, ${green}, ${blue})`;
    return expect(p).toHaveCSS('color', expected);
  }

  red = 100;
  await testColor(redSlider, red);

  green = 101;
  await testColor(greenSlider, green);

  blue = 102;
  await testColor(blueSlider, blue);

  const size = 36;
  await setInputRangeValue(sizeSlider, size);
  await expect(p).toHaveCSS('font-size', `${size}px`);
});
