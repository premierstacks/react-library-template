import type { ReactElement } from 'react';

const TITLE_LITERAL = 'IndexRoute';

export function IndexRoute(): ReactElement {
  return (
    <main>
      <h1>{TITLE_LITERAL}</h1>
    </main>
  );
}
