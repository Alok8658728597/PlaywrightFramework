import { test, expect } from '@playwright/test';

test("Login once and save login session into json file", async ({ page }) => {
    await page.goto("https://myapp.com/login");
    await page.getByRole('textbox', { name: 'username' }).fill("alokswain");
    await page.fill('#password', 'swain@23');
    await page.click('.submit');

    await page.waitForURL('/Dashboard');
    // save cookies + localStorage
    await page.context().storageState({ path: 'auth.json' });
    


})
/*After running this file, Playwright will create:
📁 auth.json
Which contains:

Cookies
LocalStorage
Tokens
Login info

This file is like:
“User is already logged in. Remember this.”
Open playwright.config.js and add:

use: {
  storageState: 'auth.json'
}
*/
//Now Write all test without login
test('Dashboard Test',async({page})=>{
    await page.goto('https://myapp.com/dashboard');
    await expect(page.getByText('WelCome')).toBeVisible();
});
//Context + Storage State = Instant Login
const context = await browser.newContext({
  storageState: 'auth.json'
});
const page = await context.newPage();