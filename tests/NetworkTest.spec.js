/*
Imagine this:
👉 You (the browser page) want to talk to a server.
You say:
“Hey server, give me product list!”
This is called a Request.

The server replies:
“Here is the product list”
This is called a Response.

Now…
🎯 "Intercept Network" means:
Playwright comes in between your browser and the server
and says:

“Wait! Before this request goes to the server, I want to look at it / change it / block it.”
Or
“Wait! Before this response reaches the browser, I want to modify it / replace it.”
That is Network Interception.
*/

import { test, expect, request } from '@playwright/test';
import { APIUtil } from '../utils/APIUtil';
const loginPayload = { userEmail: "alo2k@gmail.com", userPassword: "Santi@123456" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6964a1cbc941646b7a91786b" }] };
const fakeResponseBodyPayload = { data: [], message: "No Orders" };//Its a javascript objct 


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
   await page.goto('https://rahulshettyacademy.com/client');
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
      async route => {
         const response = await page.request.fetch(route.request());
         let body = JSON.stringify(fakeResponseBodyPayload); //We covert the js object to json becasue broswer accept json
         route.fulfill({
            response,
            body,
         });
         
      });
   //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end   
   await page.locator("button[routerlink*='myorders']").click();
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   console.log(await page.locator(".mt-4").textContent());

});

