class OpenAccountPage{
    constructor(page){

        this.page = page;

        // form inputs
        this.accountType = page.locator('#type');
        this.fromAccount = page.locator('#fromAccountId');
        this.openAccountButton = page.locator('input[value="Open New Account"]');

        // Result containers
        this.successContainer = page.locator('#openAccountResult');
        this.newAccountId = page.locator('#newAccountId');
        this.errorContainer = page.locator('#openAccountError');
    }

    async goto() {
        await this.page.goto('/parabank/openaccount.htm');
        await this.fromAccount.locator('option').first().waitFor({ state: 'attached' });
    }

    async openAccount(type = '0') {
        await this.accountType.selectOption(type);
        await this.openAccountButton.click();
        await this.successContainer.waitFor({ state: 'visible', timeout: 15000 });
    }
}
module.exports = {OpenAccountPage};