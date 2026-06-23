class FindTransactionsPage{
    constructor(page){
        this.page = page;

        this.accountId = page.locator('#accountId');
        this.amount = page.locator('#amount');
        this.findByAmount = page.locator('#findByAmount');
        this.resultContainer = page.locator('#resultContainer');
        this.transactionRows = page.locator('#transactionBody tr');
    }

    async goto(){
    await this.page.goto('/parabank/findtrans.htm');
    }

    async findByAmountValue(amount){
    await this.amount.fill(amount);
    await this.findByAmount.click()
    await this.resultContainer.waitFor({state: 'visible'});
    }
}
module.exports = {FindTransactionsPage};
