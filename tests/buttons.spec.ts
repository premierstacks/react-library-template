import { test } from '@playwright/test';
import { setup } from './test';

test('/buttons', async ({ page }) => {
  await setup(page, '/buttons');
});
