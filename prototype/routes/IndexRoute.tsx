import type { ReactElement } from 'react';
import { NavLink } from 'react-router';

export function IndexRoute(): ReactElement {
  return (
    <main>
      <h1>Select component</h1>
      <nav>
        <NavLink to="/button-component">ButtonComponent</NavLink>
      </nav>
    </main>
  );
}
