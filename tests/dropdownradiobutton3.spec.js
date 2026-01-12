import {test,expect} from '@playwright/test';

test('Dropdown and Radio Button Handling including Checkmark',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   await page.locator('select.form-control').selectOption('consult');
   await page.locator('span.checkmark').nth(1).click();
   await page.locator('#okayBtn').click();
   console.log(page.locator('span.checkmark').nth(1).isChecked());
   await  expect(page.locator('span.checkmark').nth(1)).toBeChecked();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').nth(1).isChecked()).toBeFalsy();
//Perform blinking text on the page *IF the link will have class attribute with value as blinkingText then only it will work otherwise it will give error
});
test.only('Blinking Text handling',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   const documentlink=page.locator('a[href*="documents-request"]');
   await expect(documentlink).toHaveAttribute('class','blinkingText');
});


   //Assertion

   
    


