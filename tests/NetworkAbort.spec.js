import { test, expect } from '@playwright/test';

test('request intercept', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.locator('#userEmail').fill('alo2k@gmail.com');
  await page.locator('#userPassword').fill('Santi@123456');
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();
  await page.route('**/*.{jpg,jpeg,png }',route=>route.abort());//It will not shows any images in order page
  await page.locator("button[routerlink*='myorders']").click();
});
