import { expect, test } from "@playwright/test";
import {} from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/color-demo.html");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Color Demo/);
});
