import { test, expect } from '@playwright/test'; // Bring in test tools from Playwright

test("request intercept", async ({ page }) => { // Create a test - we will intercept network calls
    // Go to login page
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    // Type email in email box
    await page.locator('#userEmail').fill('alo2k@gmail.com');
    // Type password in password box
    await page.locator('#userPassword').fill('Santi@123456');
    // Click login button
    await page.locator('#login').click();

    // Wait for page to fully load - no more network activity
    await page.waitForLoadState('networkidle');
    // Wait for product to appear on page
    await page.locator(".card-body b").first().waitFor();

    // Click on My Orders button
    await page.locator("button[routerlink*='myorders']").click();

    // IMPORTANT: We are going to catch/intercept the API call before it goes to server
    // When user clicks View - we will change the order ID in the URL to a DIFFERENT order
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        // The * means catch ALL order IDs
        // We change the order ID to 6971a604c941646b7aae2f789 (belongs to different user)
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6971a604c941646b7aae2f789' })
        // route.continue means: go ahead with the request but use our new URL instead
    )

    // Click View button on first order
    await page.locator("button:has-Text('View')").first().click();

    // Check if we see error message - means the app is protecting data correctly
    // We tried to view someone else's order, so app should say "not authorized"
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    // This proves the security is working!
})