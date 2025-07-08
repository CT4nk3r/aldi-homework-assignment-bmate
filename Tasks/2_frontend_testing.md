# Task 2: Frontend Testing

**Scenario**: You are testing a web application built using Angular.

**Testing Framework**: Describe how you would implement end-to-end tests using Cypress or
Playwright for the "Login" feature. Include:
 - Setup steps for the testing framework.
 - A sample test script for the "Login" functionality, checking for successful login and handling failures (invalid password).

## 1. Setup Steps for the Testing Framework

### Setting up Node.js

#### 1. Download Node.js

1. Navigate to the [Node.js website](https://nodejs.org/en/download) and download the correct version for your operating system. For this is going to be the windows installer.
2. Run `node-v22.17.0-x64` and during the install make sure tthe correct environmental variables are working with running `npm -v`
3. Should return the version of npm

#### 2. Initialize the project.

```bash
npm init -y
```
This creates a package.json with default settings.

#### 3. create a `.gitignore` that blocks the commiting of the `node_moduls` folder

```yml
#gitignore

#nodejs
node_modules/
```

### Cypress:

#### 1. Install Cypress:

```bash
npm install cypress --save-dev
```

#### 2. Add Cypress Scripts to `package.json`:

```json
"scripts": {
  "cypress:open": "cypress open",
  "cypress:run": "cypress run"
}
```

#### 3. Open Cypress for the First Time

```bash
npx cypress open
```

#### 4. Configure Base URL (optional):
In `cypress.config.js`:

```js
module.exports = {
  e2e: {
    baseUrl: 'https://www.aldi.hu/'
  }
}
```


### Playwright:

#### 1. Install Playwright:

Run `npm install playwright --save-dev` then run `npx playwright install`

#### 2. Add Playwright Scripts to `package.json`:

```json 
"scripts": {
  "playwright:e2e": "playwright test"
}
```

#### 2. Tests folder

Now create `tests` directory.

## 2. Sample Test Script for "Login" Functionality

### Cypress: 

Create a test in the `e2e` folder `cypress/e2e/login.cy.js`:

```js
describe('Login Feature', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[name="username"]').type('validUser');
    cy.get('input[name="password"]').type('validPassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, validUser');
  });

  it('should show error for invalid password', () => {
    cy.get('input[name="username"]').type('validUser');
    cy.get('input[name="password"]').type('wrongPassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid username or password');
    cy.url().should('include', '/login');
  });
});
```

### Playwright:

Create a file inside the `tests` folder `tests/login.spec.js`:

```js
import { test, expect } from '@playwright/test';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'validUser');
    await page.fill('input[name="password"]', 'validPassword');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text=Welcome, validUser')).toBeVisible();
  });

  test('should show error for invalid password', async ({ page }) => {
    await page.fill('input[name="username"]', 'validUser');
    await page.fill('input[name="password"]', 'wrongPassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
    await expect(page).toHaveURL(/.*login/);
  });
});
```

1. Testing both successful login and tests failures (invalid password).
2. This can easily be integrated in a CI/CD pipeline for regression testing. 
3. Redirection and the error message are both asserted, so we know we are on the correct pages and the behaviors are as expected.

#### A github actions example that could run these: 

```yml
#e2e-tests.yml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run Cypress tests
        run: npx cypress run

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test
```

This would create a pipeline that can run during a pull request as well. When a developer pushes a change, this e2e test could check if there were any breaking changes during the pull request phase.