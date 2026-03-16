//import {test,expect} from '@playwright/test';
import {test,expect} from '../CustomFixture/LoginObjectFixture.js';

test('login using custom fixture',async({loginPage})=>{
    await loginPage.goToWebsite();
    await loginPage.loginToApplication('alok','password');
})