// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,           // per-test timeout (ms)
  retries: 1,                // retry once on CI
  workers: 2,                // parallel workers

  use: {
    baseURL: 'https://parabank.parasoft.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],                            // console output
    ['allure-playwright'],               // Allure report
    ['html', { open: 'never' }],        // built-in HTML report
  ],

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
  ],
});
