import { test, expect } from '@playwright/test';

test('Client Demo App', async ({ page }) => {
  let productName = 'ZARA COAT 3';
  let products = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.locator('#userEmail').fill('alo2k@gmail.com');
  await page.locator('#userPassword').fill('Santi@123456');
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  let count = await products.count();
  for (let i = 0; i < count; ++i) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator('[routerlink*="cart"]').click();
  await page.locator('.cartSection').first().waitFor();
  const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
  expect(bool).toBeTruthy();

  page.locator("text=Checkout").click();
  await page.locator('[placeholder*="Select"]').pressSequentially("Ind");
  const dropdown = page.locator('.ta-results');
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator('button').count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator('button').nth(i).textContent();
    if (text === ' India') {
      await dropdown.locator('button').nth(i).click();
      break;
    }
  }
  //Want to put assertion the mail id shown in the checkout page
  await expect(page.locator('.user__name.mt-5 [type="text"]')).toContainText("gmail");
  await page.locator('.action__submit').click();



});
//Test File will run parallely 
//Test cases in same file will run sequnetilly