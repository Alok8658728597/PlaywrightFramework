import {test as base} from '@playwright/test';
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};

export const customTest = base.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder: {

            "username": "anshik1a@gmail.com",
            "password": "Iamking@000",
            "productName": "ADIDAS ORIGINAL"

        }
    });
