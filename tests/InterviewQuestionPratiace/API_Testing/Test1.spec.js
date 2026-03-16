import {test,expect} from '@playwright/test';

test('get request',async({request})=>{
    const response=await request.get("https://www.order.com?user=2");
    expect(response.status()).toBe(200);
    const jsonResponseBody=await response.json();
    console.log(jsonResponseBody);
    expect(jsonResponseBody.name).toContainText('Funu');

})
test('post request',async({request})=>{
    const response=await request.post('https://www.order.com/login',{
        data:{
            email:'alok@gmail.com',
            password:'AlokSwain@12'
        }
    });
    expect(response.status()).toBe(200);
    const json=await response.json();
    console.log(json.token);

})
test('put request',async({request})=>{
    const response=await request.put('https://www.order.com/users/2',{
        data:{
            name:'alokmallik',
            age:'23'
        }
    });
    expect(response.status()).toBe(200);
    const json=await response.json();
    console.log(json.token);

})
//await request.delete('https://reqres.in/api/users/2'); for delete
//Setting Headers for API
test('Setting Header for API',async({request})=>{
    request.get('https://www.getorder.com/users',{
        headers:{
            Authorization:`Bearer ${token}`,
            Accept:'application/json'
        }
    })
})
//Creating a custom API context (very important)
test('create custom api context',async({request})=>{
    const api=request.newContext({
        baseUrl: 'https://api.myapp.com',
        extraHTTPHeaders:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
        }

    });
    const res=api.get('/Dashboard');
}
)
