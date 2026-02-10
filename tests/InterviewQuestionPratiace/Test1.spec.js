//How to handle multibrowser context in playwright?

import { test, chromium } from '@playwright/test';

test('Multibrowser context test', async ( ) => {
    const broswer=await chromium.launch();
    const browserContext1 = broswer.newContext();
    const browserContext2 = broswer.newContext();
    this.page1 = browserContext1.newPage();
    const page2 = browserContext2.newPage();
    this.page1.goto("https://testautomationpractice.blogspot.com/");
    page2.goto("https://www.google.in/");

    await browserContext1.close();
    await browserContext2.close();

    await this.page1.close();
    await page2.close();

})
//How do you handle frames in playwright?

test('Handle frames in playwright', async () => {
   const framePage= this.page1.frameLocator('#frame1');
   //or
   const framePage2= this.page1.frame('#frame2');

})
//How to use getByRole in playwright?
   this.page1.getByRole("textbox",{name:"name"})

//How do you handle file upload in playwright?
  this.page1.locator('input[type="file"]').setInputFiles('path of the file');

  //to upload multiple files
  this.page1.locator('input[type="file"]').setInputFiles(['path of file1','path of file2']);

  //or using file chooser eveent
  const [filechooser]=await Promise.all([
    this.page1.waitForEvent('filechooser')
    ,this.page1.locator('input[type="file"]').click()
  ])
  filechooser.setFiles("path of the file");

  //Explain page object model in Playwright?
  //LoginPage.js
  class LoginPage{
    constructor(page){
        this.page=page;
        this.username=page.locator('#username');
        this.password=page.locator('#password');
        this.signInButton=page.locator('#signIn');
    }
    async goTo(){
       this.page.goto("https://example.com/login");
    }
    async login(username,password){
        this.username.fill(username);
        this.password.fill(password);
        this.signInButton.click();
    }

    //TestFile
    test("Test login functionality",async()=>{
        const loginPage=new LoginPage(this.page1);
        await loginPage.goTo();
        await loginPage.login("testuser","testpassword");
    })
  //How do you handle API testing in Playwright?
  import {test,expect} from '@playwright/test';

  test("api testing with plywright",async({request})=>{
      const userResponse=request.get("https://example.com/getData");
      expect(userResponse.ok()).toBeTruthy();
      const users=await userResponse.json();
      //post request
      const postResponse=await request.post("https://example.com/user",{
        data:{
          name:"testuser",
          email:"alok.swain@gmail.com"
        },
        headers:{
          'Authorization':'Bearer token'
        }
      })
      expect(postResponse.status()).toBe(201);
  })
  //How do you implement custom fixure in playwright?
  import {test as base} from '@playwright/test';

  base.extend({
    loginCustomFixture:async({browser},use)=>{
      const browserContext=browser.newContext();
      const page=browserContext.newPage();

      await page.goTo('https://example.com/login');
      await page.locator('.username').fill('testuser');
      await page.locator('.password').fill('testpassword');
      await page.locator('.signIn').click();

      await use(page);//Provide the logged in page to the test

      await browserContext.close();
    }
  });

  test('test with custom fixture login',async({loginCustomFixture})=>{
    loginCustomFixture.locator('.profile').click();
  })

//How do handle network Interception and mocking in Playwright?
//RESPONSE INTERCEPTION AND MOCKING
//page.route() → to catch the request
//route.fulfill() → to send a mocked (fake) RESPONSE
/**Playwright NEVER waits for the real server response.
Instead, it stops the request BEFORE the server sees it.
Then Playwright itself creates a FAKE response and gives it to the browser.
WILL DISCUS LATER**/


//What are different types of waits in Playwright?
//1.Auto wait -Most common
await page.click('button');
//2.wait for element state
await page.locator('.button').waitFor({state:'visible'});
await page.locator('.button').waitFor({state:'hidden'});
//3.Wait for load state
await page.goTo('https://example.com');
await page.waitForloadState('networkidle');
//4.wait for event
await page.waitForEvent('popup');

//How do you handle authentication and session storage in Playwright?
//Log in once → save storageState.json (cookies + localStorage + sessionStorage) → reuse in every test.
//If UI login is flaky/slow → log in via API and write storageState.json yourself

import { chromium } from '@playwright/test';
import fs from 'fs'//IF playwright want to work with js filesystem then it has to use nodejs fs module

export default async function loginAndSaveStorageState(){
    const browswr=await chromium.launch();
    const page=await browswr.newPage();
 await page.goto('https://example.com/login');
  //Fill the login form
  await page.locator("#username").fill('testuser');
  await page.locator('#password').fill('testpassword');
  await page.locator('#signIn').click();

  await page.waitForURL('**/dashboard');
  fs.mkdirSync('auth', {recursive:true});//Create auth folder if not exist
  page.context().storageState({path:'auth/storageState.json'});//Save storage state to a file
  await browswr.close();
}
//playwright.config.js
globalSetup: './global-setup.js',

  use: {
    storageState: 'auth/storageState.json',  // reuse saved login
    baseURL: 'https://example.com',
  }
  /*Or else we can place the login logic in beforeAll*/
  test.beforeAll(async()=>{});
//Test file work without login logic because we are reusing the storage state

// tests/dashboard.spec.js  (ESM)
import { test, expect } from '@playwright/test';

test('Dashboard loads without login', async ({ page }) => {
  await page.goto('/dashboard');  // already logged in
  await expect(page.getByText(/welcome/i)).toBeVisible();
});

//How to perfrom visual regression testing in Playwright?
//1.Take a screenshot of the page or element
const screenshot = await page.screenshot();
//2.Compare the screenshot with a baseline image
expect(screenshot).toMatchSnapshot('baseline.png');
//3.If the images do not match, Playwright will save a diff image for you to review

//How do you handle broswer contexts for parallel test isolation in Playwright?















   