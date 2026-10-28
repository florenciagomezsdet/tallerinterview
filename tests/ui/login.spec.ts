import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const PASSWORD = 'secret_sauce';

test.describe('Login', () => {
  test('valid user lands on inventory page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', PASSWORD);
    await expect(login.error).toContainText('Sorry, this user has been locked out.');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});
