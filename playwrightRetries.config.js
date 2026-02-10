// @ts-check
import { defineConfig, devices } from '@playwright/test';
//npx playwright test 'DemoApp.spec.js' --config playwrightRetries.config.js -If u want to run from differnt config file.
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40*1000,
  workers: 2, //At a time we want to run 2 test files but default it will run 5 when we 'use npx playwright test'
  retries: 1, // Set retries for failed tests (Maximun 1/2 time we can retry)
  expect:{
    timeout:5000,
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName:'chromium',
    channel:'msedge',
    headless:false,
    screenshot:'only-on-failure',
    trace:'retain-on-failure',
    ignoreHTTPSErrors:true, //use this to ignore ssl certificate issue
    permissions:['geolocation'],//USe this to accept location permission
    video :'off', //record video only on failure
  },
});


