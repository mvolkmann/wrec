import {defineConfig, devices} from '@playwright/test';

const PORT = 5173;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  //reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']}
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']}
    },
    {
      name: 'webkit',
      use: {...devices['Desktop Safari']}
    }

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
  use: {
    baseURL: `http://localhost:${PORT}/examples/`
  },
  webServer: {
    command: `vite --config vite.config.test.ts --port ${PORT} --strictPort`,
    reuseExistingServer: !process.env.CI
  }
});
