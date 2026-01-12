//We have two modules to use for import or export one is CommonJS and other is ES6 modules
//Now a days mostly we use ES6 modules

import {test,expect} from '@playwright/test';

//Normal test case
test('First Playwright Test',async()=>{
    console.log("Hello Playwright");
});
//Test case with browser context and page
//use test.only to run only this test case
test('Browser Context Playwright Test',async({browser})=>{
   const browserContext=await browser.newContext();
   const page=await browserContext.newPage();
   await page.goto("https://testautomationpractice.blogspot.com/");
   console.log(await page.title());
});
//Test case with page only
test('Page Playwright Test',async({page})=>{
    await page.goto("https://www.google.in/");
   const result= await page.title();
  await expect(page).toHaveTitle('Google');
});