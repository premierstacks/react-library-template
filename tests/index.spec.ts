import { expect, test } from '@playwright/test';
import { assertAxe } from './assertions';

test('/', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Home/);
  await expect(page.locator('text=Hello world!')).toBeVisible();
  await assertAxe(page);
});
