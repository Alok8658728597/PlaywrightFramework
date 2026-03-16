import {test as base,expect as baseExpect} from '@playwright/test';
import {login} from '../POM/login.js';

export const test=base.extend({
    loginPage:async({page},use)=>{
        const login1=new login(page);
       await use(login1);
    }
});
export const expect=baseExpect;
//Here we are exporting test and expect becasue we have to use these in our test

