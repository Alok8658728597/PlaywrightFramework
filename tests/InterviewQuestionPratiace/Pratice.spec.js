import {test,expect} from '@playwright/test';

test('Interview questins pratice',async({browser})=>{
   const context=browser.newContext();
   const page=await context.newPage();
   await page.goto("https://example.com");
   page.locator(".item").nth(0).click();
   page.getByRole("link",{name:'Dashboard'}).click();
   page.locator(".cards").filter({hasText:'Alok'}).getByRole('button',{name:'Edit'}).click();
   page.selectOptions('#dropdown',{Label:"Option1"}); //Seclect from dropdown using lable
   await expect(page.locator("#id")).toHaveText("1234"); //WebAssertions
   await expect.soft(page).toHaveURL('**/dashboard'); //Soft assertions
   await expect(page.locator("#id")).toHaveValue('5');
   await page.screenshot({path:'fullpage.png',fullPage:true});//fullpage screenshot
   await page.locator('#logo').screenshot({ path: 'logo.png' });//element screenshot
   await page.setInputFiles('#uploadFile','test/data/myfile.pdf');//Single file upload
   await page.setInputFiles('#uploadFile',['alok.png','funu.png']);//Multiple file upload
   const browser = await chromium.launch({ headless: false, slowMo: 200 }); //its used for slow motion
   //How to perform file download
   const [ download ] =Promise.all([
      await context.waitForEvent('download'),
      page.click('#downloadbutton')
   ]);
   const filePath=await download.path();
   console.log('save at:',filePath)
})

