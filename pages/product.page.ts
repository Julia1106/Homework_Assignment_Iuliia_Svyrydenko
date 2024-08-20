import { Locator, Page} from '@playwright/test';
 export class ProductPage{
    private page: Page;
   
    

    constructor(page: Page){
        this.page = page;
    }
        async addProductToCart (productName){
            await this.page.click(`text=${productName}`);
            await this.page.click('button[id*="add-to-cart"]');

        }
         async navigateToCart(){
            await this.page.click('[data-test="shopping-cart-link"]');
         }
         async addProductToCartMainPage(productName){
             // Format the product name to match the ID format in the locator
         const formattedProductName = productName.toLowerCase().replace(/ /g, '-');
            await this.page.click(`button[id="add-to-cart-${formattedProductName}"]`)
         }
     }
    