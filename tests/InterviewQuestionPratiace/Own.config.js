import { defineConfig,devices } from '@playwright/test';

export default defineConfig(
    {
        testDir:'/test',
        timeout:23*1000,
        expect:{
            timeout:3000
        },
        retries:2,
        //This blocks contains default setting for all test
        use:{
            headless:true,
            baseURL:'https://example.com',
            screenshot:'only-on-failure',
            video:'retain-on-failure',
            trace:'on-first-retry',
            ignoreHTTPSErrors:true,
            storageState:'Auth.json',
            
        },
        workers:2,
        reporter:[['html'],['list']],
        projects:[{name:'chromium',use:{
            browserName:'chromium'
         }},{name:'firefox',use:{
            browserName:'firefox'}}],
        use:devices['Pixel 5']    
    }
);