import { expect, test } from '@playwright/test';
import { assertAxe, waitForIdle } from './assertions';

test('/404', async ({ page }) => {
  await page.goto('/404');
  await waitForIdle(page);

  await expect(page).toHaveTitle(/Page not found/);
  await expect(page.locator('text=Page not found!')).toBeVisible();
  await assertAxe(page);
});
