import { test, expect } from '@playwright/test';

// Test focused with .only so this file runs by itself while you're learning
test.only('Test all get locator', async ({ page }) => {
    // Go to the practice form page
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    // Find the checkbox by its label text and check it (click to toggle on)
    await page.getByLabel('Check me out if you Love IceCreams!').check();

    // Find the select element labeled 'Gender' and choose the option with value 'Female'
    // selectOption accepts value, label, or index depending on the element
    await page.getByLabel('Gender').selectOption('Female');

    // Find the radio/checkbox labeled 'Employed' and check it
    await page.getByLabel('Employed').check();

    // Find the input with placeholder 'Password' and type the password into it
    await page.getByPlaceholder('Password').fill('Alok@234');

    // Click the button with role=button and name 'Submit'
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify the success message is visible on the page
    // Using expect(...) is recommended for assertions; here is an explicit check:
    await expect(page.getByText('The Form has been submitted successfully!.')).toBeVisible();

    // Click the link with role=link and name 'Shop' to navigate to the shop page
    await page.getByRole('link', { name: 'Shop' }).click();

    // Find the app-card elements, filter to the one that contains text 'Nokia Edge'
    // then find the button inside that card and click it (Add to cart / View etc.)
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click();
    

});

/*
Quick mapping for getByRole selectors (useful reminders):
- <button>         -> role "button"
- <a href="">     -> role "link"
- <input type="text"> -> role "textbox"
- <input type="checkbox"> -> role "checkbox"
- <h1>…</h1>       -> role "heading" (can check level)
- <img alt="">    -> role "img" (use alt text)

Notes:
- Prefer `expect(...).toBeVisible()` for assertions (gives useful errors and waits).
- `getByLabel()` targets visible form controls by their label text.
- `getByPlaceholder()` targets inputs by their placeholder attribute.
- `locator(...).filter({ hasText })` narrows down elements containing specific text.
*/