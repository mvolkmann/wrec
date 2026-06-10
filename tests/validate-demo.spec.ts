import { expect, Page, test } from "@playwright/test";
import { expectProperty } from "./util";

test.beforeEach(navigateToValidateDemo);

test("displays validation messages for rejected min and max values", verifiesValidationMessages);

// Navigates to the validation demo example before each test.
async function navigateToValidateDemo({ page }: { page: Page }) {
  await page.goto("validate-demo.html");
}

// Verifies invalid min and max input values dispatch validation events.
async function verifiesValidationMessages({ page }: { page: Page }) {
  async function enter(input: any, value: string) {
    await input.fill(value);
    return page.keyboard.press("Tab");
  }

  const component = page.locator("validate-demo");
  const maxInput = component.locator("#max");
  const message = component.locator("p");
  const minInput = component.locator("#min");

  await expect(component).toBeAttached();
  await expect(minInput).toHaveValue("0");
  await expect(maxInput).toHaveValue("0");
  await expect(message).toBeEmpty();

  await enter(minInput, "-1");
  await expectProperty(component, "min", 0);
  await expect(message).toHaveText("min must be a non-negative number.");

  await enter(maxInput, "3");
  await expectProperty(component, "max", 3);

  await enter(minInput, "4");
  await expectProperty(component, "min", 0);
  await expect(message).toHaveText("min must be less than or equal to max.");

  await enter(minInput, "2");
  await expectProperty(component, "min", 2);

  await enter(maxInput, "1");
  await expectProperty(component, "max", 3);
  await expect(message).toHaveText("min must be less than or equal to max.");

  // TODO: How can message be cleared after valid values are entered?
}
