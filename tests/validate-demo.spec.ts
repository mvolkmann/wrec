import { expect, Locator, Page, test } from "@playwright/test";
import { expectProperty } from "./util";

test.beforeEach(navigateToValidateDemo);

// Verifies valid and invalid color values dispatch validation events.
test("displays validation messages for rejected color values", async ({ page }: { page: Page }) => {
  const component = page.locator("validate-demo");
  const colorInput = component.locator('input[id=" color"]');
  const message = component.locator("p");

  await expect(component).toBeAttached();
  await expect(colorInput).toHaveValue("");
  await expect(message).toBeEmpty();

  await enterInput(page, colorInput, "f00");
  await expectProperty(component, "color", "f00");
  await expect(message).toBeEmpty();

  await enterInput(page, colorInput, "ff0000");
  await expectProperty(component, "color", "ff0000");
  await expect(message).toBeEmpty();

  await enterInput(page, colorInput, "red");
  await expectProperty(component, "color", "ff0000");
  await expect(message).toHaveText("Value must be a hex color.");
});

// Verifies invalid min and max input values dispatch validation events.
test("displays validation messages for rejected min and max values", async ({ page }: { page: Page }) => {
  const component = page.locator("validate-demo");
  const maxInput = component.locator("#max");
  const message = component.locator("p");
  const minInput = component.locator("#min");

  await expect(component).toBeAttached();
  await expect(minInput).toHaveValue("0");
  await expect(maxInput).toHaveValue("0");
  await expect(message).toBeEmpty();

  await enterInput(page, minInput, "-1");
  await expectProperty(component, "min", 0);
  await expect(message).toHaveText("min must be a non-negative number.");

  await enterInput(page, maxInput, "3");
  await expectProperty(component, "max", 3);

  await enterInput(page, minInput, "4");
  await expectProperty(component, "min", 0);
  await expect(message).toHaveText("min must be less than or equal to max.");

  await enterInput(page, minInput, "2");
  await expectProperty(component, "min", 2);

  await enterInput(page, maxInput, "1");
  await expectProperty(component, "max", 3);
  await expect(message).toHaveText("min must be less than or equal to max.");

  // TODO: How can message be cleared after valid values are entered?
});

// Enters a value into an input and moves focus away to trigger validation.
async function enterInput(page: Page, input: Locator, value: string) {
  await input.fill(value);
  return page.keyboard.press("Tab");
}

// Navigates to the validation demo example before each test.
async function navigateToValidateDemo({ page }: { page: Page }) {
  await page.goto("validate-demo.html");
}
