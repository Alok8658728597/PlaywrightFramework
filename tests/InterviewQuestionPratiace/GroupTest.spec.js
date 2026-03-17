import {test,expect} from '@playwright/test';

test.beforeEach("@smoke @web @api these are grouping test" ,async({page})=>{
    await page.goto("https://www.alok.com");
    await expect(page).toHaveTitle(/Alok/);

})
test.only("@smoke @ui @api these are grouping test" ,async({page})=>{
    await page.goto("https://www.alok.com");
    await expect(page).toHaveTitle(/Alok/);

})
test("@regression @web @api these are grouping test" ,async({page})=>{
    await page.goto("https://www.alok.com");
    await expect(page).toHaveTitle(/Alok/);

})
//To Run web test: npx playwright test --grep "@web"
//To Run api test: npx playwright test --grep "@api"
//To Run regression test: npx playwright test --grep "@regression"