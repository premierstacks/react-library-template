import type { FC, ReactNode } from 'react';
import { Link } from 'react-aria-components';

export const NotFoundRoute: FC = (): ReactNode => {
  return (
    <main>
      <Link href="/">Return back</Link>
    </main>
  );
};
