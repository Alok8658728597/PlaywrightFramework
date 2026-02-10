import {test,expect} from '@playwright/test';

test('Switching Window and Tab Handling',async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const [newPage]=await Promise.all(
   [ 
    context.waitForEvent('page'),
    page.locator('a[href*="documents-request"]').click(),
   ])
   let text=await newPage.getByText('Please email us at').textContent();
   console.log(text);

   


});