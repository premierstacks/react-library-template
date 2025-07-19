import type { CSSProperties } from 'react';

export function toClass(
  a: string | null | undefined,
  b: string | null | undefined,
): string {
  const classes: string[] = [];

  if (typeof a === 'string' && a.trim() !== '') {
    classes.push(...a.trim().split(/\s+/));
  }

  if (typeof b === 'string' && b.trim() !== '') {
    classes.push(...b.trim().split(/\s+/));
  }

  return classes.join(' ');
}

export function toCssProperties(
  a: CSSProperties | null | undefined,
  b: CSSProperties | null | undefined,
): CSSProperties {
  return Object.assign({}, a, b);
}

function normalizePart(part: string | null | undefined): string | null | undefined {
  if (typeof part !== 'string') {
    return null;
  }

  let trimmed = part.trim();

  if (trimmed.endsWith(';')) {
    trimmed = trimmed.slice(0, -1).trim();
  }

  return trimmed !== '' ? trimmed : null;
}

export function toStyle(
  a: string | null | undefined,
  b: string | null | undefined,
): string {
  const styles: string[] = [];

  const normalizedA = normalizePart(a) ?? '';
  const normalizedB = normalizePart(b) ?? '';

  if (normalizedA !== '') {
    styles.push(normalizedA);
  }

  if (normalizedB !== '') {
    styles.push(normalizedB);
  }

  return styles.join('; ');
}
