import { test, expect } from '@playwright/test';

test("Screeshot and Visual testing comparision", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:"partialscreeshot.png"}); //It will take element level screeshot
    await page.locator('#hide-textbox').click();
    await page.screenshot({path:"screeshot.png"}); //It will take entier page screenshot
    await expect(page.locator('#displayed-text')).toBeHidden();

});
test.only("Visual testing- Compare Screeshot to screeshot", async ({ page }) => {
    await page.goto("https://google.com/");
    
     expect(await page.screenshot()).toMatchSnapshot('landing.png');//It will match screeshot wise

});