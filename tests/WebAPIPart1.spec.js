import { test, expect, request } from '@playwright/test';
import { APIUtil } from '../utils/APIUtil';
const loginPayload = { userEmail: "alo2k@gmail.com", userPassword: "Santi@123456" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6964a1cbc941646b7a91786b" }] };


let response;
test.beforeAll(async ({ }) => {
   //Login API
   const apiContext = await request.newContext();
   const apiutil = new APIUtil(apiContext, loginPayload);
   response = await apiutil.createOrder(orderPayload);


})

test('Place an order', async ({ page }) => {
   page.addInitScript((value) => {
      window.localStorage.setItem('token', value);
   }, response.token)

   //     await page.getByPlaceholder('email@example.com').fill('alo2k@gmail.com');
   //     await page.getByPlaceholder('enter your passsword').fill('Santi@123456');
   //     await page.getByRole('button',{name:'Login'}).click();
   //     await page.waitForLoadState('networkidle');
   await page.goto('https://rahulshettyacademy.com/client');
   //    let productName='ZARA COAT 3';
   //     let products=page.locator('.card-body');
   //     await page.locator(".card-body b").first().waitFor();
   //    await page.locator('.card-body').filter({hasText:productName})
   //    .getByRole('button',{name:'Add To Cart'}).click();

   //     await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();
   //     await page.locator('.cartSection').first().waitFor();
   //     await expect(page.getByText(productName)).toBeVisible();

   //     await page.getByText('Checkout').click();

   //     await page.getByPlaceholder('Select Country').pressSequentially("Ind");
   //     await page.getByRole('button', { name: 'India' }).nth(1).click();
   //     page.getByText('Place Order ').click();
   //     await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();
   //    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   //  console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

/*
If your project contains both Web and API tests, you can debug a
specific test file by adding a custom script in the package.json, such as:

"test": "npx playwright test WebAPIPart1.spec.js"
Shortcut to open debugmode: shft+ctrl+p >debug npm script
Note:
When debugging using this approach, it is recommended
to increase the test timeout to around 1000 seconds.
*/

