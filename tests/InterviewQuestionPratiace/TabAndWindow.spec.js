import {test,expect} from '@playwright/test';

test('Handle window and tab',async({browser})=>{
    const browserContext=browser.newContext();
    const page=(await browserContext).newPage();
    await page.goto("https://windowortab.com");
    const [newPage]=await Promise.all([
        await browserContext.waitForEvent(page),
        await page.click("selector-that-opennewtab")
    ]);
})
//Click a link that opens a new tab
test('Handle window and tab when click on link',async({browser})=>{
    
    const browserContext=browser.newContext();
    const page=(await browserContext).newPage();
    await page.goto("https://windowortab.com");
    const [newPage]=await Promise.all([
        await browserContext.waitForEvent(page),
        await page.click("#href")
    ]);
    await newPage.waitForLoadState();//Don't do anything until this page is fully loaded
    console.log(await newPage.title());
   //Get all open tab
  const pages= await browserContext.pages ();//use page method
  console.log(pages.length);
  const secondTab=pages[1];//find the second tab
  await page.bringToFront();//switch from child tab to parent tab
})

