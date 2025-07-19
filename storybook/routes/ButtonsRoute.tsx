import type { ReactElement } from 'react';
import { PrimaryButton } from '../../src';
import { StorybookDisplay } from '../components/StorybookDisplay';

export function ButtonsRoute(): ReactElement {
  return (
    <StorybookDisplay>
      <StorybookDisplay.Items
        label="Primary Button"
      >
        <PrimaryButton
          label="Label"
        />
      </StorybookDisplay.Items>
    </StorybookDisplay>
  );
}
