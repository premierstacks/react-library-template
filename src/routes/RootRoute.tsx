import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export const RootRoute: FC = (): ReactNode => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
