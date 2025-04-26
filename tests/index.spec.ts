import { expect, test } from '@playwright/test';

test('/', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/premierstacks\/browser-webpack-typescript-react-library-template/);
  await expect(page.locator('text=IndexRoute')).toBeVisible();
});
