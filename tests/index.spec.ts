import { expect, test } from '@playwright/test';
import { waitForIdle } from './assertions';

test('/', async ({ page }) => {
  await page.goto('/');
  await waitForIdle(page);

  await expect(page).toHaveTitle(/premierstacks\/browser-webpack-typescript-react-library-template/);
  await expect(page.locator('text=Select component')).toBeVisible();
});
