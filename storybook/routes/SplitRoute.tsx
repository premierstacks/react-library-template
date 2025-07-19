import * as stylex from '@stylexjs/stylex';
import type { ReactElement } from 'react';
import { Link } from 'react-aria-components';
import { Outlet } from 'react-router';

function Nav(): ReactElement {
  return (
    <nav>
      <div>
        <Link
          href="/buttons"
        >
          Buttons
        </Link>
      </div>
    </nav>
  );
}

const containerStyles = stylex.create({
  base: {
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
});

const gridStyles = stylex.create({
  base: {
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
  },
});

export function SplitRoute(): ReactElement {
  return (
    <div
      {...stylex.props(containerStyles.base)}
    >
      <div
        {...stylex.props(gridStyles.base)}
      >
        <Nav />
        <Outlet />
      </div>
    </div>
  );
}
