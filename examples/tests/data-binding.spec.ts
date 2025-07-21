import { expect, test } from "@playwright/test";
import {} from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/data-binding.html");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Data Binding Demo/);
});
