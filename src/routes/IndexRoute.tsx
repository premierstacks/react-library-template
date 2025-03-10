import type { FC, ReactNode } from 'react';
import { Link } from 'react-aria-components';

export const IndexRoute: FC = (): ReactNode => {
  return (
    <main style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href="/premierstacks">Premierstacks</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </main>
  );
};
