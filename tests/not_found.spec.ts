import { test } from '@playwright/test';
import { setup } from './test';

test('/not_found', async ({ page }) => {
  await setup(page, '/not_found');
});
