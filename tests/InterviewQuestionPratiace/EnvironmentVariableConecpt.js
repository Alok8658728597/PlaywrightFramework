/*✅ Easy Real-Life Example (You can use in interview)
✅ Problem:
You have:

QA URL
DEV URL
Stage URL

But your test should not change every time.
✅ Solution:
Put URLs in .env file.*/

//✅ Step 1: Create .env file
BASE_URL=https://qa.myapp.com
ADMIN_EMAIL=admin@qa.com
ADMIN_PASSWORD=Pass123
//✅ Step 2: Load .env inside Playwright config
//playwright.config.js
import 'dotenv/config';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL, // ✅ Now correctly loaded
    headless: true,
  }
});
//Use environment variable inside your test's
import { test, expect }  from '@playwright/test';

test('Login test', async ({ page }) => {
  await page.goto('/login'); // ✅ baseURL is automatically applied

  await page.fill('#email', process.env.ADMIN_EMAIL);
  await page.fill('#password', process.env.ADMIN_PASSWORD);

  await page.click('#loginButton');

  await expect(page).toHaveURL(/dashboard/);
});
