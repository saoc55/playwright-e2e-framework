class AccountOverviewPage {
    constructor(page){
        this.page = page;

        this.pageHeading = page.locator('h1.title', { hasText: 'Accounts Overview' });
        this.accountTable = page.locator('#accountTable');
        this.totalBalance = page.locator('#accountTable tbody tr:last-child td:nth-child(2)');
    }

    async goto() {
        await this.page.goto('/parabank/overview.htm');
    }

    async getAccountRows(){
        return this.accountTable.locator('tbody tr');
    }

    async getTotalBalance(){
        return this.totalBalance.textContent();
    }
}

module.exports = {AccountOverviewPage};