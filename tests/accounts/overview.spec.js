const {test, expect} = require ("../../fixtures");
const { AccountOverviewPage } = require ("../../pages/AccountOverviewPage");

test.describe('Overview', ()=>{

    let accountsOverview;

    test.beforeEach(async ({authenticatedPage})=> {
        accountsOverview = new AccountOverviewPage(authenticatedPage);
        await accountsOverview.goto();
    });

    test('Page heading is visible and contains "Accounts Overview', async({authenticatedPage})=>{
        await expect(authenticatedPage).toHaveURL(/overview.htm/);
        await expect(accountsOverview.pageHeading).toBeVisible();
        await expect(accountsOverview.pageHeading).toContainText("Accounts Overview");
    });

    test('Account Table is visible', async({authenticatedPage})=> {
        const rows = await accountsOverview.getAccountRows();
        await expect(rows).not.toHaveCount(0);
    });

    test('Total Balance is visible and contains $', async({authenticatedPage})=> {
        const total = await accountsOverview.getTotalBalance();
        await expect(total).toContain('$');
    });

   //test('Clicking an account opens its activity page', async({authenticatedPage})=>{
   //     const activityPage = new ActivityPage(page);
   //     await activityPage.goto();
   //     await expect(page).toHaveURL('activity.htm?id=15120');
   //     await expect(page).toContainText('Account Details');
   // });

})