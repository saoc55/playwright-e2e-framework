const {test, expect} = require ('../../fixtures');
const {TransferFundsPage} = require('../../pages/TransferFundsPage');
const {FindTransactionsPage} = require('../../pages/FindTransactionsPage');

test.describe('Find Transactions', () =>{

    test('TC-10 | find by amount returns results', async({authenticatedPage})=>{
        const transfer = new TransferFundsPage(authenticatedPage);
        const findTx = new FindTransactionsPage(authenticatedPage);

        // Step 1: find out which account findtrans is watching
        await findTx.goto();
        const targetAccount = await findTx.accountId.inputValue();

        // Step 2: transfer TO that account
        await transfer.goto();
        await transfer.toAccount.selectOption({ value: targetAccount });
        await transfer.amountInput.fill('100');
        await transfer.transferButton.click();
        await transfer.successTitle.waitFor({ state: 'visible' });

        // Step 3: search
        await findTx.goto();
        await findTx.findByAmountValue('100');

        expect(await findTx.transactionRows.count()).toBeGreaterThan(0);
        
    });

    test('TC-11 | no match shows empty results table', async({authenticatedPage}) =>{
        const findTx = new FindTransactionsPage(authenticatedPage);

        await findTx.goto();
        await findTx.findByAmountValue('99999.99');

        await expect(findTx.resultContainer).toBeVisible();
        expect(await findTx.transactionRows.count()).toBe(0);
    });

});
