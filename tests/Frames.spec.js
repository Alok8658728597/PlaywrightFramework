import {test,expect} from '@playwright/test'; // Import test function and expect assertion from Playwright testing library
import { text } from 'node:stream/consumers'; // Import text utility (Note: This import is unused in the current test)

test("Handle Frames",async({page})=>{  // Define a test case named "Handle Frames" - receives page object as fixture
    // frameLocator is used to access content inside iframes without switching context
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); // Navigate to the test URL
    
    const framePage=page.frameLocator('#courses-iframe'); // Get reference to iframe with id 'courses-iframe' using frameLocator
    
    // Click on "All Access plan" text that is visible (>>visible=true ensures we click the visible element if multiple exist)
    // Note: Multiple elements with same text may exist in page, so we filter for visible one
    await framePage.locator("text=All Access plan>>visible=true").click();
    
    // Assert that the element with class "text h2" containing text "13,522" exists and is truthy (visible/present)
    // This verifies that clicking the plan button displayed the expected pricing information
    expect(framePage.locator(".text h2").filter({hasText:"13,522"})).toBeTruthy();
})