import {test,expect} from '@playwright/test';
//Do NOT call backend. Instead, send fake data from Playwright. [route.fullfill()]
test('Send fake response from playwright to broswer',async({page})=>{
    page.route('https://www.myapp.com/login',async route=>{
       await route.fulfill({
          status:200,
          contentType:'application/json',
          body:JSON.stringify({token:'alok123'})
       });
    });

   //Now go to your UI
   page.goto('https://www.myapp.com/') 
});
//Let the request go normally to backend and provide the real response route.continue()
test('Send the real response to broswer',async({page})=>{
    page.route('https://www.myapp.com/login',async route=>{
        route.continue();
    })
})
/*✔ Request goes to backend
✔ Backend responds normally
✔ Playwright does nothing*/

//Block API Request route.abort()
test('Block the request',async({page})=>{
    page.route('https://www.myapp.com/login',async route=>{
        route.abort();
    })
})
/*✔ Browser sends login request
✔ Playwright blocks it
✔ UI shows an error message
✔ Useful to test “Something went wrong” screens*/
