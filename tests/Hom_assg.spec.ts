import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login.page'
import { ProductPage } from '../pages/product.page';
import { before, beforeEach } from 'node:test';

test.describe('Login tests', ()=>{
  let loginPage: LoginPage; // Declare loginPage variable

  test.beforeEach(async({page})=>{
    // Instantiate LoginPage
    loginPage = new LoginPage(page);
    //use navigate method to go to the login page before each test
    await loginPage.navigate();
  });

  test('Valid login', async ({page})=>{
    //verify that the navigation was successful
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    //login with valid credentials
    await loginPage.login('standard_user','secret_sauce');
    await loginPage.clickLoginButton();
    //vryfy that login was successful
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  });

  test('Invalid Login', async({page})=>{
    //verify that the navigation was successful
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    //login with invalid credentials
    await loginPage.login('user123','secret_sauce');
    await loginPage.clickLoginButton();
    //vrify that login was unsuccessful
    await expect(page.locator('.error-message-container')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});

test.describe('Add to cart test', ()=>{
  
  let loginPage: LoginPage // Declare loginPage variable
  let productPage: ProductPage // Declare productPage variable
  test.beforeEach(async({page})=>{
     // Instantiate LoginPage and ProductPage
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    
    //use navigate method to go to the login page before each test
    await loginPage.navigate();
    //login with valid credentials
    await loginPage.login('standard_user','secret_sauce');
    await loginPage.clickLoginButton();
    //vryfy that login was successful
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  });

  test ('add to cart from main page', async({page})=>{
    // add product Sauce Labs Backpack from main page
    await productPage.addProductToCartMainPage("Sauce Labs Backpack");
     // verify a badge with a count of 1
     await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
     // navigate to cart
     await productPage.navigateToCart();
     // verify tahat product was successfuiiy added
     await expect(page.locator('.inventory_item_name')).toHaveText(' Sauce Labs Backpack');
  })

  test ('add to cart from product details',async({page})=>{
    // add Sauce Labs Bike Light to cart
    await productPage.addProductToCart("Sauce Labs Bike Light");
    // verify a badge with a count of 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    // navigate to cart
    await productPage.navigateToCart();
    // verify tahat product was successfuiiy added
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Bike Light');

  });

  test.describe('chexkout test', ()=>{
    test.beforeEach(async({page})=>{
        // Instantiate LoginPage 
    loginPage = new LoginPage(page);
        //use navigate method to go to the login page
        await loginPage.navigate();
        //login with valid credentials
        await loginPage.login('standard_user','secret_sauce');
        await loginPage.clickLoginButton();
        // add product Sauce Labs Backpack from main page
       await productPage.addProductToCartMainPage("Sauce Labs Backpack");
        // navigate to cart
        await productPage.navigateToCart();
    });
    test('successful checkout', async({page})=>{
      await page.click("#checkout");
      await page.fill("#first-name", "John");
      await page.fill("#last-name", "Doe");
      await page.fill("#postal-code","123");
      await page.click("#continue");
      await page.click("#finish");
      await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
    test('attempt  to process checkout without credentials', async({page})=>{
      await page.click("#checkout");
      await page.click("#continue");
      await expect(page.locator('.error-message-container')).toContainText('Error: First Name is required');
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    });
  });
});