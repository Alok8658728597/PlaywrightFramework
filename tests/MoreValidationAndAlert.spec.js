import {test,expect} from '@playwright/test';

test("More Validations",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();

       await expect(page.locator('#displayed-text')).toBeVisible();
       await page.locator('#hide-textbox').click();
       await expect(page.locator('#displayed-text')).toBeHidden();
       //How to handle java popup/dilogs in Playwright
       page.on('dialog',dialog=>dialog.accept());
       await page.locator("#confirmbtn").click();
       await page.locator('#mousehover').hover();

});