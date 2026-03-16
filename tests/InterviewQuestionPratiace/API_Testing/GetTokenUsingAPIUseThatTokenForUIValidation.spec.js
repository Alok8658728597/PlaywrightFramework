import { test, expect } from '@playwright/test';
//Get token from API
test('Login to API, get token and use that token to work on UI without login into UI', async ({ request, page }) => {
    const apiContext=await request.newContext();
    const api = await apiContext.post('https://www.order.com/user', {
        data: {
            username: 'alok@gmail.con',
            password: 'alok@123'
        }
    });
    const token = (await api.json()).token;
    //Inject token into UI’s localStorage
    await page.addInitScript(token => {
        window.localStorage.setItem('auth_token', token);
    }, token);
    /* This runs BEFORE the page loads
  So the UI thinks user is already logged in.*/
    //Now go to any authenticated page
    page.goto('https://myapp.com/dashboard');

    //If application keeps token in cookies instead of localStorage:

    await page.context().addCookies([{
        name: 'token',
        value: token,
        domain: 'myapp.com',
        path: '/',
        httpOnly: false,
        secure: true
    }]);
    //Now login after add cookies
    await page.goto('https://myapp.com/dashboard');


})