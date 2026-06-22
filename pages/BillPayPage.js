class BillPayPage {
    constructor(page){
        this.page = page;
        
        // Inputs
        this.name = page.locator('input[name="payee.name"]');
        this.address = page.locator('input[name="payee.address.street"]');
        this.city = page.locator('input[name="payee.address.city"]');
        this.state = page.locator('input[name="payee.address.state"]');
        this.zipCode = page.locator('input[name="payee.address.zipCode"]');
        this.phone = page.locator('input[name="payee.phoneNumber"]');
        this.accountNumber = page.locator('input[name="payee.accountNumber"]');
        this.verifyAccount = page.locator('input[name="verifyAccount"]');
        this.amount = page.locator('input[name="amount"]');
        this.fromAccountId = page.locator('select[name="fromAccountId"]');

        // Send
        this.sendPayment = page.locator('input[value="Send Payment"]');

        this.billPayResult = page.locator('#billpayResult h1.title');

        this.validationModel = page.locator('#validationModel-name');
    }
async goto(){
    await this.page.goto('/parabank/billpay.htm');
}

async payBill(name, address, city, state, zip, phone, account, amount){
    await this.name.fill(name);
    await this.address.fill(address);
    await this.city.fill(city);
    await this.state.fill(state);
    await this.zipCode.fill(zip);
    await this.phone.fill(phone);
    await this.accountNumber.fill(account);
    await this.verifyAccount.fill(account);
    await this.amount.fill(amount);

    await this.fromAccountId.selectOption({index: 0});

    await this.sendPayment.click();


}
}
module.exports = {BillPayPage};
