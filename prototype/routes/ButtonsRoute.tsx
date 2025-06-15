import type { ReactElement } from 'react';
import { ButtonComponent } from '../../src';

export function ButtonsRoute(): ReactElement {
  return (
    <main>
      <h1>
        Buttons
      </h1>
      <div>
        <ButtonComponent
          label="Label"
        />
      </div>
    </main>
  );
}
