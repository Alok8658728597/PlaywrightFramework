import {test,expect} from '@playwright/test';

test('handle popup click on ok',async({page})=>{
    page.on('dialog',async dialog=>{
        console.log(dialog.message);
        await dialog.accept();
        await dialog.dismiss();
        //Enter text then accept
        await dialog.accept("Alok");
    })
});
test('handle frame using framelocator',async({page})=>{
    await page.goto('https://www.framework.com');
    page.frameLocator('#loginframe').locator('.clickonelement').fill("Alok123").click();
    
})
test('handle frame using page fixture if the frame dosent has id,name and frameis dynamic',async({page})=>{
    await page.goto('https://www.framework.com');
    const frame1=await page.frame({name:'loginframe'}); //get by name
    const frame = page.frames()[1]; //use index here
    
})
