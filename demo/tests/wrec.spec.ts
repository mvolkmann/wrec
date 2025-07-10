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
  const divSelector = "counter-vanilla >>> div";
  const span = page.locator(divSelector + "> span").first();
  await expect(span).toHaveText("3");

  const incBtn = page.locator(divSelector + "> #increment-btn");
  await incBtn.click();
  await expect(span).toHaveText("4");

  const decBtn = page.locator(divSelector + "> #decrement-btn");
  for (let i = 1; i <= 4; i++) {
    await decBtn.click();
  }
  await expect(span).toHaveText("0");
  await expect(decBtn).toBeDisabled();

  await incBtn.click();
  await expect(decBtn).toBeEnabled();
});

/*
test("wrec counter works", async ({ page }) => {
  await goTo(page);
  const divSelector = "counter-wrec >>> div";
  const spanSelector = divSelector + "> span";
  const span = page.locator(spanSelector).first();
  await expect(span).toHaveText("3");
  await page.click(divSelector + "> #increment-btn");
  await expect(page.locator(spanSelector)).toHaveText("4");
  const decBtn = await page.locator(divSelector + "> #decrement-btn");
  for (let i = 1; i <= 4; i++) {
    await decBtn.click();
  }
  await expect(page.locator(spanSelector)).toHaveText("0");
  await expect(decBtn).toBeDisabled();
});
*/
