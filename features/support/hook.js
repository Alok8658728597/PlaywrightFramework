
import { After, AfterStep, Before, BeforeStep,Status } from '@cucumber/cucumber';
import { POManager } from '../../pageObjects/POManager.js';
import { chromium, expect } from '@playwright/test';


Before( async function () {
  const broswer=await chromium.launch({headless:false});
    const context=await broswer.newContext();
    this.page=await context.newPage();
    this.poManager = new POManager(this.page); //World constructor
});
BeforeStep(async function(){
    
});
After(async function(){
    console.log("I am last to execute!!");
})
AfterStep(async function({result}){
    if(result.status===Status.FAILED){
       await this.page.screenshot({path:'screenshot.png'})
    }
});
