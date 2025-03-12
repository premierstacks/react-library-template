import type { FC, ReactNode } from 'react';
import { Link } from 'react-aria-components';

export const NotFoundRoute: FC = (): ReactNode => {
  return (
    <main>
      <div>NotFoundRoute</div>
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </main>
  );
};
