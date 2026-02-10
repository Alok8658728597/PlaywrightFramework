class APIUtil{

    constructor(apiContext,loginPayload){
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }
    async getToken(){
        const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:this.loginPayload
    })//Status code 200,201,204 etc
   //expect(loginResponse.ok()).toBeTruthy();
   const loginResponseJson=await loginResponse.json();
   const tokenValue=loginResponseJson.token;
   return tokenValue;
    }
  async createOrder(orderPayload){
     let response={};
     response.token=await this.getToken();
     const orderResponse=await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
        data:orderPayload,
        headers:{
            "Authorization":response.token,
            "Content-Type":'application/json',
        },
       })
       const orderJsonResponse=await orderResponse.json();
       console.log(orderJsonResponse);
       const orderId=orderJsonResponse.orders[0];
       response.orderId=orderId;
       return response;

  }

    
}
export {APIUtil};