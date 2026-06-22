const {test, expect} = require ('../../fixtures');
const {BillPayPage} = require ('../../pages/BillPayPage');

test.describe('Bill Payment', () =>{
    let billPaymentPage;

    test.beforeEach(async ({authenticatedPage}) =>{
        billPaymentPage = new BillPayPage(authenticatedPage);
        await billPaymentPage.goto();
    });

    test('TC-08 | Bill pay form submits successfully with valid data', async () => {
        await billPaymentPage.payBill(
            'Test Payee',
            '123 Main St',
            'Springfield',
            'OH',
            '12345',
            '555-1234',
            '12456',
            '25'
        );

        await expect(billPaymentPage.billPayResult).toHaveText('Bill Payment Complete');
    });

    test('TC-09 | Bill pay with missing payee name shows validation error', async () => {
        await billPaymentPage.sendPayment.click();

        await expect(billPaymentPage.validationModel).toBeVisible();
    });
});