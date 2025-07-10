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
  const spanSelector = divSelector + "> span";
  await expect(page.locator(spanSelector)).toHaveText("3");
  await page.click(divSelector + "> #increment-btn");
  await expect(page.locator(spanSelector)).toHaveText("4");
  const decBtn = await page.locator(divSelector + "> #decrement-btn");
  for (let i = 1; i <= 4; i++) {
    await decBtn.click();
  }
  await expect(page.locator(spanSelector)).toHaveText("0");
  await expect(decBtn).toBeDisabled();
});
