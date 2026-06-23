# Playwright E2E Framework

![CI](https://github.com/saoc55/playwright-e2e-framework/actions/workflows/playwright.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-1.x-45ba4b?logo=playwright)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-f7df1e?logo=javascript)
![License](https://img.shields.io/badge/License-MIT-blue)

End-to-end test automation framework built with Playwright and JavaScript, targeting the [Parabank](https://parabank.parasoft.com) demo banking application. Demonstrates POM architecture, custom fixtures, cross-browser execution, and CI integration via GitHub Actions.

---

## Tech Stack

- **Playwright** — browser automation and test runner
- **JavaScript (CommonJS)** — test language
- **Allure + HTML Reporter** — test reporting
- **GitHub Actions** — CI on every push to `main`
- **Browsers** — Chromium, Firefox

---

## Project Structure

```
├── pages/                  # Page Object Models
│   ├── LoginPage.js
│   ├── AccountOverviewPage.js
│   ├── TransferFundsPage.js
│   ├── BillPayPage.js
│   ├── FindTransactionsPage.js
│   └── OpenAccountPage.js
├── tests/
│   ├── auth/
│   │   └── Login.spec.js
│   ├── accounts/
│   │   ├── overview.spec.js
│   │   └── openAccount.spec.js
│   ├── transactions/
│   │   ├── transfer.spec.js
│   │   ├── FindTransaction.spec.js
│   │   └── billpay/
│   │       └── billpay.spec.js
├── fixtures/
│   └── index.js            # authenticatedPage fixture
├── utils/
│   └── testData.js         # shared test data
├── playwright.config.js
└── .github/workflows/
    └── playwright.yml
```

---

## Setup

**Prerequisites:** Node.js 18+, Git

```bash
git clone https://github.com/saoc55/playwright-e2e-framework.git
cd playwright-e2e-framework
npm install
npx playwright install
```

---

## Running Tests

```bash
# Run all tests (Chromium + Firefox)
npx playwright test

# Run headed (visible browser)
npx playwright test --headed

# Run a specific spec
npx playwright test tests/auth/Login.spec.js

# Run with Allure report
npx playwright test
npx allure generate allure-results --clean
npx allure open
```

---

## Test Coverage

| TC | Description | Module | Browsers |
|----|-------------|--------|----------|
| TC-01 | Valid login redirects to overview | Auth | Chromium, Firefox |
| TC-02 | Invalid credentials shows error | Auth | Chromium, Firefox |
| TC-03 | Accounts overview loads with account rows | Accounts | Chromium, Firefox |
| TC-04 | Total balance displays with $ sign | Accounts | Chromium, Firefox |
| TC-06 | Transfer funds completes successfully | Transactions | Chromium |
| TC-07 | Transfer with missing amount shows server error | Transactions | Chromium |
| TC-08 | Bill pay submits with valid payee | Transactions | Chromium |
| TC-09 | Bill pay with missing payee shows validation error | Transactions | Chromium |
| TC-10 | Find transactions by amount returns results | Transactions | Chromium |
| TC-11 | Find transactions with no match shows empty table | Transactions | Chromium |
| TC-12 | Open new checking account succeeds | Accounts | Chromium |

---

## Key Patterns

**Page Object Model** — each page is a class with locators in the constructor and interaction methods that encapsulate Playwright calls. Tests never touch locators directly.

**Custom fixture** — `authenticatedPage` extends Playwright's base `test` to provide a pre-logged-in page, eliminating login boilerplate from every spec.

**AJAX handling** — Parabank uses jQuery AJAX throughout. Tests use `waitForResponse`, `waitFor({ state: 'attached' })`, and `waitFor({ state: 'visible' })` as appropriate per endpoint behavior rather than arbitrary `waitForTimeout` calls.

**Data seeding** — TC-10 seeds a transaction by performing a real transfer to the target account before searching, demonstrating realistic E2E chaining across multiple page objects.

---

## CI

GitHub Actions runs the full test suite on every push to `main`. Allure results are generated as a build artifact.
