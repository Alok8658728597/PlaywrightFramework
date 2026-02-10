//Some cases only token not enough ,so we have to use cookies,s
// ..ession storeage and local storage so thats the reason we are injecting all these into new broswer then use them
import { test, expect } from '@playwright/test';
let WebContext;
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('alo2k@gmail.com');
    await page.locator('#userPassword').fill('Santi@123456');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: "state.json" });
    WebContext = await browser.newContext({ storageState: "state.json" });
});

test('Client Demo App', async () => {
    let productName = 'ZARA COAT 3';
    const page = await WebContext.newPage();
    let products = page.locator('.card-body');
    
    await page.goto("https://rahulshettyacademy.com/client");
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

    await page.locator("text=Checkout").click();
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
    await page.pause();



});
// test('Test Case2', async () => {
//     const page = await WebContext.newPage();
//     await page.goto("https://rahulshettyacademy.com/client");
//     const products = page.locator('.card-body');

//     await page.locator(".card-body b").first().waitFor();
//     const titles = await page.locator(".card-body b").allTextContents();
//     console.log(titles);
// });