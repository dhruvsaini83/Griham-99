// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.js/,
  timeout: 45 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    channel: 'chrome',
    headless: true,
    ignoreHTTPSErrors: true,
  },
});
