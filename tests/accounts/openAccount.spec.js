const {test, expect} = require('../../fixtures');
const {OpenAccountPage} = require('../../pages/OpenAccountPage');

test.describe(' Open New Account', () =>{
    let openNewAccount;

    test.beforeEach(async ({authenticatedPage}) => {
        openNewAccount = new OpenAccountPage(authenticatedPage);
        await openNewAccount.goto();
    });

    test('TC-12 | Open new Account', async ({authenticatedPage}) =>{
        await openNewAccount.openAccount();
        await expect(openNewAccount.newAccountId).not.toBeEmpty();
    });
});