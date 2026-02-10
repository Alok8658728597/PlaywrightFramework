import { expect,test,Locator,Page } from "@playwright/test";

export class LoginPage {
    page:Page;
    signInButton:Locator    ;
    usernameField:Locator;
    passwordField:Locator;
    constructor(page:Page) {
        this.page = page;
        this.signInButton = page.locator('#login');
        this.usernameField = page.locator('#userEmail');
        this.passwordField = page.locator('#userPassword');
    }
    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }
    async login(username:string, password:string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
