import { expect, test } from '@playwright/test';
import { assertAxe } from './assertions';

test('should load the not found page and display the correct content', async ({ page }) => {
  await page.goto('/404');
  await expect(page).toHaveTitle(/Page not found/);
  await expect(page.locator('text=Page not found!')).toBeVisible();
  await assertAxe(page);
});
