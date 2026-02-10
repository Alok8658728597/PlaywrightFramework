import {test,expect} from '@playwright/test';

test('Client Demo App',async({page})=>{
    let productName='ZARA COAT 3';
    let products=page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder('email@example.com').fill('alo2k@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('Santi@123456');
    await page.getByRole('button',{name:'Login'}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
   await page.locator('.card-body').filter({hasText:productName})
   .getByRole('button',{name:'Add To Cart'}).click();

    await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();
    await page.locator('.cartSection').first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByText('Checkout').click();

    await page.getByPlaceholder('Select Country').pressSequentially("Ind");
    await page.getByRole('button', { name: 'India' }).nth(1).click();
    page.getByText('Place Order ').click();
    await expect(page.getByText(' Thankyou for the orderrr. ')).toBeVisible();
    
    

});
