const { test, expect }      = require('../../fixtures');
const { TransferFundsPage } = require('../../pages/TransferFundsPage');
 
test.describe('Transfer Funds', () => {
  let transferPage;
 
  test.beforeEach(async ({ authenticatedPage }) => {
    transferPage = new TransferFundsPage(authenticatedPage);
    await transferPage.goto();
  });
 
  test('TC-06 | Transfer funds succeeds and shows confirmation', async () => {
    await transferPage.transfer('50');
 
    await expect(transferPage.successTitle).toBeVisible();
    await expect(transferPage.successTitle).toHaveText('Transfer Complete!');
    await expect(transferPage.amountResult).toHaveText('$50.00');
  });
 
  test('TC-07 | Transfer with empty amount shows validation error', async () => {
    // Submit without filling the amount field
    await transferPage.transferButton.click();
 
    await expect(transferPage.errorPanel).toBeVisible();
  });
});
 