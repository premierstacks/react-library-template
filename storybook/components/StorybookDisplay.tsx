import * as stylex from '@stylexjs/stylex';
import type { ReactElement, ReactNode } from 'react';
import { StorybookDisplayItem } from './StorybookDisplayItem';
import { StorybookDisplayItems } from './StorybookDisplayItems';

interface StorybookDisplayProps {
  readonly children: ReactNode;
}

const rootStyles = stylex.create({
  base: {
    columnGap: '4rem',
    display: 'grid',
    rowGap: '4rem',
  },
});

export function StorybookDisplay({ children }: StorybookDisplayProps): ReactElement {
  return (
    <main
      {...stylex.props(rootStyles.base)}
    >
      {children}
    </main>
  );
}

StorybookDisplay.Item = StorybookDisplayItem;
StorybookDisplay.Items = StorybookDisplayItems;
