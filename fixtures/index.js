const {test: base} = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');

exports.test = base.extend({
    //'authenticatedPage' fixture - logs in before each test uses it
    authenticatedPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('John', 'demo');
        await use(page);

    },
});

exports.expect = base.expect;

