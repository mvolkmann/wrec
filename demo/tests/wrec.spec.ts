import { test, expect } from "@playwright/test";

async function goTo(page) {
  await page.goto("http://localhost:5173/");
}

test("has title", async ({ page }) => {
  await goTo(page);
  await expect(page).toHaveTitle(/wrec Demo/);
});

test("vanilla counter works", async ({ page }) => {
  await goTo(page);
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

test("wrec counter works", async ({ page }) => {
  await goTo(page);
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
