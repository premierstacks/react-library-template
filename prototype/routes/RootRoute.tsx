import type { ReactElement } from 'react';
import { Outlet } from 'react-router';

export function RootRoute(): ReactElement {
  return <Outlet />;
}
