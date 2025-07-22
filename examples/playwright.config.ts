import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  reporter: "html",
  projects: [
    /*
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    */
    /*
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    */
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile view ports. */
    /*
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    */

    /* Test against branded browsers. */
    /*
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    */
  ],

  // Run local server before starting tests.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
