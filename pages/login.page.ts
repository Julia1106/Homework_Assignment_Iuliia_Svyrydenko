import { Locator, Page} from '@playwright/test';
 export class LoginPage{
    private page: Page;
    private userName: Locator;
    private password: Locator;
    private loginButton: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.userName =  page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('password');
        this.loginButton =  page.locator('[data-test="login-button"]');
    }
    async navigate(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: any, password: any){
        await this.userName.fill(username);
        await this.password.fill(password);
        
     }
     async clickLoginButton(){
        await this.loginButton.click();
     }
    }