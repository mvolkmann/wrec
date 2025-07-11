import { expect, Locator, test } from "@playwright/test";

async function expectProperty(
  locator: Locator,
  propertyName: string,
  expectedValue: string
) {
  const value = await locator.evaluate(
    (el, { propertyName }) => el[propertyName],
    { propertyName }
  );
  return expect(value).toBe(expectedValue);
}

function setAttribute(locator: Locator, attrName: string, attrValue: string) {
  return locator.evaluate(
    (el, { attrName, attrValue }) => el.setAttribute(attrName, attrValue),
    { attrName, attrValue }
  );
}

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
  await expectProperty(radioGroup, "value", color);
  await expectProperty(selectList, "value", color);
  await expect(span).toHaveText(color);

  let options = "";

  async function testColors(options) {
    // The first option should be selected.
    const color = options.split(",")[0];
    await expectProperty(radioGroup, "value", color);
    await expectProperty(selectList, "value", color);
    await expect(span).toHaveText(color);

    // Verify the radio buttons.
    const colors = options.split(",");
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

  // Change the list of options in the binding-demo element.
  options = "pink,yellow";
  await setAttribute(bindingDemo, "options", options);
  await testColors(options);

  // Change the list of options in the radio-group element.
  options = "white,gray,black";
  await setAttribute(radioGroup, "options", options);
  await testColors(options);

  // Change the list of options in the select-list element.
  options = "purple,orange,cyan,brown";
  await setAttribute(selectList, "options", options);
  await testColors(options);
});

test("binding-demo-input", async ({ page }) => {
  const bindingDemo = page.locator("binding-demo");
  const p = bindingDemo.locator("#input-demo > p");
  await expect(p).toHaveText("Hello, Mark!");

  setAttribute(bindingDemo, "name", "Tami");
  await expect(p).toHaveText("Hello, Tami!");

  //TODO: Type in the input.
});

test("binding-demo-textarea", async ({ page }) => {
  const bindingDemo = page.locator("binding-demo");
  const span = bindingDemo.locator("#textarea-demo > p > span");
  await expect(span).toHaveText("Once upon a time...");

  const story = "Far away ...";
  setAttribute(bindingDemo, "story", story);
  await expect(span).toHaveText(story);

  //TODO: Type in the textarea.
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
