import { expect, type Page } from '@playwright/test';
import { assertAxe } from './assertions';

export async function waitForIdle(page: Page): Promise<void> {
  await page.waitForLoadState('load');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
}

export async function setup(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await waitForIdle(page);
  await expect(page.getByTestId('sentinel')).toBeAttached();
  await assertAxe(page);
}
