import type { ReactElement } from 'react';
import { Outlet } from 'react-router';

export interface SentinelRouteProps {
  readonly children?: ReactElement;
}

export function SentinelRoute({ children }: SentinelRouteProps): ReactElement {
  if (children !== undefined) {
    return (
      <div
        data-testid="sentinel"
      >
        {children}
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <div
        data-testid="sentinel"
      />
    </>
  );
}
