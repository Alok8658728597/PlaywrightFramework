import { Given, When, Then } from '@cucumber/cucumber';
import { POManager } from '../../pageObjects/POManager.js';
import { chromium, expect } from '@playwright/test';
Given('a login to the E-Commerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

  // const broswer=await chromium.launch({headless:false});
  //   const context=await broswer.newContext();
  //   const page=await context.newPage();
  //   this.poManager = new POManager(page); //World constructor
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.login(username, password);
});
When('Add the item {string} to the cart', async function (productName) {
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.serachProductAndAddToCart(productName);
  await this.dashboardPage.goToCart();
});
Then('Verify the {string} is checkout successfully', async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});
When('Enter valid detials and place the order', async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
});
Then('Verify the order present in the order history', async function () {
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});         