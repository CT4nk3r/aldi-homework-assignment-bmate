const { test, expect } = require('@playwright/test');
const userData = require('../fixtures/userData.json'); // Import user data from JSON

test.describe('Login Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/hu/log-in.html');
    
    await page.click('.at-login_lnk');

    const rejectBtn = page.locator('#onetrust-reject-all-handler');
    try {
      await rejectBtn.waitFor({ state: 'visible', timeout: 5000 });
      await rejectBtn.click();
    } catch (error) {
      console.log("No cookie popup");
    }

    await expect(page).toHaveURL(/.*\/hu\/log-in.html/);
  })
  

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('#member_login_email', userData.email);
    await page.fill('#member_login_password', userData.password);

    await page.click('#login_submit');

    await expect(page).toHaveURL(/.*\/hu\/my-profile.html/);
  });

  test('should show an error on failed login', async ({ page }) => {
    await page.fill('#member_login_email', 'wrongusername');
    await page.fill('#member_login_password', 'wrongpassword');

    await page.click('#login_submit');

    const errorMessage = await page.locator('.col_add-padding-right > .on-login-fail-generic-msg').textContent();
    expect(errorMessage.trim()).toContain('Az email-cím és a jelszó nem egyeznek meg.');
    
    await expect(page).toHaveURL(/.*\/hu\/log-in.html/);
  });
});
