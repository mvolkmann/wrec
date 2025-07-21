import { expect, test } from "@playwright/test";
import {
  expectProperty,
  setAttribute,
  setProperty,
  waitForNextFrame,
} from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/wrec Demo/);
});

test("binding-demo-colors", async ({ page }) => {
  const bindingDemo = page.locator("binding-demo");
  const radioGroup = bindingDemo.locator("radio-group");
  const selectList = bindingDemo.locator("select-list");
  const span = bindingDemo.locator("#selected-color").locator("span");

  let color = "blue"; // initial value
  await expectProperty(radioGroup, "value", color);
  await expectProperty(selectList, "value", color);
  await expect(span).toHaveText(color);

  // Click the "green" radio button.
  color = "green";
  await radioGroup.locator(`input[value="${color}"]`).click();
  await expectProperty(radioGroup, "value", color);
  await expectProperty(selectList, "value", color);
  await expect(span).toHaveText(color);

  // Select the "red" option.
  color = "red";
  const select = selectList.locator("select");
  await select.selectOption(color);
  await waitForNextFrame(page);
  await expectProperty(radioGroup, "value", color);
  await expectProperty(selectList, "value", color);
  await expect(span).toHaveText(color);

  async function testColors(values) {
    await waitForNextFrame(page);

    // The first option should be selected.
    const color = values.split(",")[0];
    await expectProperty(radioGroup, "value", color);
    await expectProperty(selectList, "value", color);
    await expect(span).toHaveText(color);

    // Verify the radio buttons.
    const colors = values.split(",");
    const divs = await radioGroup.locator("div > div");
    let count = await divs.count();
    expect(count).toBe(colors.length);
    for (let i = 0; i < count; i++) {
      const div = divs.nth(i);
      const text = await div.locator("label").textContent();
      await expect(text).toBe(colors[i]);
    }

    // Verify the option elements inside the select element.
    const optionElements = selectList.locator("option");
    count = await optionElements.count();
    expect(count).toBe(colors.length);
    for (let i = 0; i < count; i++) {
      const optionElement = optionElements.nth(i);
      const text = await optionElement.textContent();
      await expect(text).toBe(colors[i]);
    }
  }

  let values = "";

  // Change the list of values in the binding-demo element.
  values = "pink,yellow";
  await setAttribute(bindingDemo, "colors", values);
  await testColors(values);

  // Change the list of values in the radio-group element.
  values = "white,gray,black";
  await setAttribute(radioGroup, "values", values);
  await testColors(values);

  // Change the list of values in the select-list element.
  values = "purple,orange,cyan,brown";
  await setAttribute(selectList, "values", values);
  await testColors(values);
});

test("binding-demo-input", async ({ page }) => {
  const bindingDemo = page.locator("binding-demo");
  const p = bindingDemo.locator("#input-demo > p");
  await expect(p).toHaveText("Hello, Mark!");

  let name = "Tami";
  setAttribute(bindingDemo, "name", name);
  await expect(p).toHaveText(`Hello, ${name}!`);

  const input = bindingDemo.locator("#input-demo > input");
  name = "Comet";
  await input.fill(name);
  await expect(p).toHaveText(`Hello, ${name}!`);
});

test("binding-demo-number", async ({ page }) => {
  const bindingDemo = page.locator("binding-demo");

  const numberInput = bindingDemo.locator("number-input");
  const input = numberInput.locator("input");
  const decBtn = numberInput.locator("button").first();
  await expect(decBtn).toHaveText("-");
  const incBtn = numberInput.locator("button").last();
  await expect(incBtn).toHaveText("+");

  const numberSlider = bindingDemo.locator("number-slider");
  const rangeInput = numberSlider.locator("input");

  const span = bindingDemo.locator("#score-p > span");

  async function testNumber(expected: string) {
    await waitForNextFrame(page);
    await expectProperty(input, "value", expected);
    await expectProperty(rangeInput, "value", expected);
    await expect(span).toHaveText(expected);
  }

  let number = 5; // initial value
  await expectProperty(numberInput, "value", number);
  await expectProperty(numberSlider, "value", number);
  await expect(span).toHaveText(String(number));

  // Click the "+" and "-" buttons of the number-input element.
  await incBtn.click();
  await testNumber(String(number + 1));

  await decBtn.click();
  await decBtn.click();
  await testNumber(String(number - 1));

  // Enter a new number in the input element of the number-input element.
  let expected = "19";
  await input.fill(expected);
  await testNumber(expected);

  // Drag the slider.
  expected = "100";
  //TODO: Why doesn't this work instead of modifying a number-slider property?
  //await setAttribute(rangeInput, "value", expected);
  await setProperty(numberSlider, "value", expected);
  await testNumber(expected);
});

test("binding-demo-textarea", async ({ page }) => {
  const bindingDemo = page.locator("binding-demo");
  const span = bindingDemo.locator("#textarea-demo > p > span");
  await expect(span).toHaveText("Once upon a time...");

  let story = "Far away ...";
  setAttribute(bindingDemo, "story", story);
  await expect(span).toHaveText(story);

  const textarea = bindingDemo.locator("#textarea-demo > textarea");
  story = "In a land ...";
  await textarea.fill(story);
  await expect(span).toHaveText(story);
});

test("counter-vanilla", async ({ page }) => {
  const rootSelector = "counter-vanilla";
  const span = page.locator(rootSelector + "> span").first();
  await expect(span).toHaveText("3");

  const incBtn = page.locator(rootSelector + "> #increment-btn");
  await incBtn.click();
  await expect(span).toHaveText("4");

  const decBtn = page.locator(rootSelector + "> #decrement-btn");
  for (let i = 1; i <= 4; i++) {
    await decBtn.click();
  }
  await expect(span).toHaveText("0");
  await expect(decBtn).toBeDisabled();

  await incBtn.click();
  await expect(decBtn).toBeEnabled();
});

test("counter-wrec", async ({ page }) => {
  const div = page.locator("counter-wrec").first();
  const span = div.locator("span").first();
  await expect(span).toHaveText("3");

  const incBtn = div.locator("button").last();
  await expect(incBtn).toHaveText("+");
  await incBtn.click();
  await expect(span).toHaveText("4");

  const decBtn = div.locator("button").first();
  for (let i = 1; i <= 4; i++) {
    await decBtn.click();
  }
  await expect(span).toHaveText("0");
  await expect(decBtn).toBeDisabled();

  await incBtn.click();
  await expect(decBtn).toBeEnabled();
});

test("hello-world", async ({ page }) => {
  let component = page.locator("hello-world").first();
  let p = component.locator("p");
  await expect(p).toHaveText("Hello, World. Shouting WORLD!");

  component = page.locator("hello-world").last();
  p = component.locator("p");
  await expect(p).toHaveText("Hello, Mark. Shouting MARK!");

  setAttribute(component, "name", "Tami");
  await expect(p).toHaveText("Hello, Tami. Shouting TAMI!");
});

test("multiply-numbers", async ({ page }) => {
  const component = page.locator("multiply-numbers");
  const result = component.locator("span").last();
  await expect(result).toHaveText("12");

  setAttribute(component, "n1", "5");
  setAttribute(component, "n2", "6");
  await expect(result).toHaveText("30");
});

test("temperature-eval", async ({ page }) => {
  const component = page.locator("temperature-eval");
  await expect(component).toHaveText("not freezing");

  setAttribute(component, "temperature", "20");
  await expect(component).toHaveText("freezing");
});

test("toggle-switch", async ({ page }) => {
  const component = page.locator("toggle-switch");
  await expectProperty(component, "checked", true);
  await component.click();
  await expectProperty(component, "checked", false);
  await page.keyboard.press("Enter");
  await expectProperty(component, "checked", true);
  await page.keyboard.press("Space");
  await expectProperty(component, "checked", false);
});
