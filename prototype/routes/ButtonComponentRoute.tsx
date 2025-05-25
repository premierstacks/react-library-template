import type { ReactElement } from 'react';
import { ButtonComponent } from '../../src';

export function ButtonComponentRoute(): ReactElement {
  return (
    <main>
      <h1>ButtonComponent</h1>
      <div>
        <ButtonComponent label="Label" />
      </div>
    </main>
  );
}
