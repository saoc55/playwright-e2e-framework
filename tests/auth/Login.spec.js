const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Authentication', () => {

  test('valid login redirects to account overview', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('john', 'demo');
    await expect(page).toHaveURL(/overview/);
  });

  test('invalid credentials show error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('bad_user', 'bad_pass');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('The username and password could not be verified');
  });

});
