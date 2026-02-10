import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects_ts/POManager.ts';
import { customTest } from '../utils_ts/test-base.ts';
//Below import loads the JSON test data file with type assertion once we mentiond type:'json' it will auto convert json into js object
import testData from '../utils/DemoAppPOTestData.json' assert { type: 'json' };

for(const data of testData){
test(`Client App login for ${data.productName}`, async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.login(data.username, data.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.serachProductAndAddToCart(data.productName);
  await dashboardPage.goToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  let orderId:any;
  orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
}
customTest(`Client App login using fixture`, async ({ page, testDataForOrder }) => { //SEnd Test data from fixture and use it here
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.login(testDataForOrder.username, testDataForOrder.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.serachProductAndAddToCart(testDataForOrder.productName);
  await dashboardPage.goToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
});