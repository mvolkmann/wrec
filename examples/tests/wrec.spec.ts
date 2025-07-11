import { expect, Locator, test } from "@playwright/test";

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

test("counter-vanilla", async ({ page }) => {
  const rootSelector = "counter-vanilla >>> div";
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
  const div = page.locator("counter-wrec").first().locator("div");
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
