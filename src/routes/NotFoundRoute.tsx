import type { ReactElement } from 'react';

const LABEL = '404';

export function NotFoundRoute(): ReactElement {
  return (
    <main>
      <div>{LABEL}</div>
    </main>
  );
}
