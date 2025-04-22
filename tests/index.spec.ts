import { expect, test } from '@playwright/test';
import { assertAxe } from './assertions';

test('should load the homepage and display the correct content', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Home/);
  await expect(page.locator('text=Hello world!')).toBeVisible();
  await assertAxe(page);
});
