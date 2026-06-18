const {test: base} = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {validUser} = require('../utils/testData');

exports.test = base.extend({
    //'authenticatedPage' fixture - logs in before each test uses it
    authenticatedPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);
    //wait for post-login landing - Account overview or dashboard
        await page.waitForURL('**/overview.htm', {timeout: 10000});
        await use(page);

    },
});

const expect = base.expect;

exports.expect = base.expect;

