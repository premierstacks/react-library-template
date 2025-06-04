import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';
import { waitForIdle } from './test';

export async function assertAxe(page: Page): Promise<void> {
  await waitForIdle(page);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice', 'ACT', 'EN-301-549']).analyze()).violations).toEqual([]);
}
