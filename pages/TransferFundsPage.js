class TransferFundsPage {
  constructor(page) {
    this.page = page;
 
    // Form inputs
    this.amountInput    = page.locator('#amount');
    this.fromAccount    = page.locator('#fromAccountId');
    this.toAccount      = page.locator('#toAccountId');
    this.transferButton = page.locator('input[value="Transfer"]');
 
    // Success result
    this.successTitle       = page.locator('#showResult h1.title');
    this.amountResult       = page.locator('#amountResult');
    this.fromAccountResult  = page.locator('#fromAccountIdResult');
    this.toAccountResult    = page.locator('#toAccountIdResult');
 
    // Validation error (amount field)
    this.errorPanel = page.locator('#showError');
    this.errorPanelTitle = page.locator('#showError hi.title')
  }
 
  async goto() {
    await this.page.goto('/parabank/transfer.htm');
  }
 
  /**
   * Fill and submit the transfer form.
   * @param {string} amount   - Dollar amount as string, e.g. '50'
   * @param {number} fromIndex - Option index for from-account (default 0)
   * @param {number} toIndex   - Option index for to-account (default 1)
   */
  
  async transfer(amount, fromIndex = 0, toIndex = 1) {
    await this.fromAccount.selectOption({ index: fromIndex });
    await this.toAccount.selectOption({ index: toIndex });
    await this.amountInput.fill(amount);
    await this.transferButton.click();
    await this.successTitle.waitFor({ state: 'visible' });
  }
}
 
module.exports = { TransferFundsPage };
 