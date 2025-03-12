import type { FC, ReactNode } from 'react';
import { Link } from 'react-aria-components';

export const ErrorRoute: FC = (): ReactNode => {
  return (
    <main>
      <div>ErrorRoute</div>
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </main>
  );
};
