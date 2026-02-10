import {test,expect} from '@playwright/test';

test('Calander Validation',async({page})=>{
    const month='6';
    const date='30';
    const year='2027';
    const expectedDate=[month,date,year];

   await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();

    await page.getByText(year).click();
   // page.locator('.react-calendar__year-view__months').nth(5).click(); //6th month june here we are hardcoding value 5
   await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click(); //6th month june here we are using variable month
    await page.locator("//abbr[text()='"+date+"']").click(); //here we are using variable date
   const input= page.locator('.react-date-picker__inputGroup__input');
   for(let i=0;i<expectedDate.length;i++){
    const value=await input.nth(i).inputValue();
     expect(value).toEqual(expectedDate[i]);
   }
});
/*Note: To debug more use below commands 
1.npx playwright test --debug
2.npx playwright test --headed
3.npx playwright test tests/Calander.spec.js --debug
4.npx playwright test Calander.spec.js --ui 
5.npx playwright codegen https://rahulshettyacademy.com/seleniumPractise/#/offers
6.to take screeshot and make trace  change in configuation file use screenshot:'on' and trace:'on'
*/