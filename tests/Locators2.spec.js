//Open a login page
//Enter the username and password
//Click on Login button
//Note: Playwright supports css selectors mostly but also supports xpath 

import{test,expect} from '@playwright/test';

test('Locators in Playwright with successful login',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    
   //If multiple locators are matching then we can use nth to select the index
   //console.log(await page.locator('.card-body a').nth(0).textContent());
   //to print first matching element we have method called first
   //console.log(await page.locator('.card-body a').first().textContent());
   //If we have more than 1000elemetns in that case first and nth function will not work we have to use alltextcontents but if comment nth and first function it will work but not print the list of elemetsimply return the empty array
    // const listOfAllTitle=await page.locator('.card-body a').allTextContents();
    // console.log(listOfAllTitle);   
    //Resolve this we have to use networkidle or same first method
    //await page.waitForLoadState('networkidle'); //if this not work then use first with waitfor function
    await page.locator('.card-body a').first().waitFor();
    const listOfAllTitle=await page.locator('.card-body a').allTextContents();
     console.log(listOfAllTitle); 

    
});
test('Locators in Playwright with failed login',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('wrongpassword');
    await page.locator('#signInBtn').click();
    console.log(await page.locator("div[style*='block']").textContent()); //We use TextContent() to get the text inside the element(It comes with page fixture)
    expect(page.locator(div[style*='block'])).toContainText('Incorrect'); //we use toContainText to verify partial text(It comes with except )
});
 