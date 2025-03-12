import type { FC, ReactNode } from 'react';
import { Link } from 'react-aria-components';

export const IndexRoute: FC = (): ReactNode => {
  return (
    <main>
      <div>IndexRoute</div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </main>
  );
};
