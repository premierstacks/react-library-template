import type { ReactElement } from 'react';
import { Link } from 'react-router';

export function IndexRoute(): ReactElement {
  return (
    <main>
      <nav>
        <div>
          <Link
            to="/buttons"
          >
            buttons
          </Link>
        </div>
      </nav>
    </main>
  );
}
