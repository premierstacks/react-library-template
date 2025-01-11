import type { FC, ReactNode } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

export const RootRoute: FC = (): ReactNode => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};
