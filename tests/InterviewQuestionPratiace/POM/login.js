class login{
    constructor(page){
        this.page=page;
        this.username=page.locator('.username');
        this.password=page.locator('#password');
        this.loginButton=page.locator('#login');
    }
    async goToWebsite(){
        await this.page.goto('https://example.com');
    }
    async loginToApplication(username,password){
        this.username.fill(username);
        this.password.fill(password);
        this.loginButton.click();
    }
}
export {login};