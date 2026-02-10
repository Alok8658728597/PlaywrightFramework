import { expect,test,Locator,Page } from "@playwright/test";

export class DashboardPage {
    page:Page;
    productsText:Locator;
    cart:Locator;
    cartPage:Locator;
    orders:Locator;
    constructor(page:Page) {
        this.page = page;
        this.productsText = page.locator(".card-body");
        this.cart = page.locator('[routerlink*="cart"]');
        this.cartPage = page.locator('.cartSection');
        this.orders = page.locator("button[routerlink*='myorders']");


    }
    async serachProductAndAddToCart(productName:string) {
        await this.productsText.first().waitFor();
        const titles = await this.productsText.allTextContents();
        console.log(titles);

        let count = await this.productsText.count();
        for (let i = 0; i < count; ++i) {
            if (await this.productsText.nth(i).locator('b').textContent() === productName) { //If u are using chaning locator then dont use it for page object
                await this.productsText.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

    }
    async goToCart() {
        await this.cart.click();
        await this.cartPage.first().waitFor();
    }
    async navigateToOrders() {
        await this.orders.click();
    }

}
