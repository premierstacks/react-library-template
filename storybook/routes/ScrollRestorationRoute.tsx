import { useCallback, type ReactElement } from 'react';
import { Outlet, ScrollRestoration, type Location } from 'react-router';

export function ScrollRestorationRoute(): ReactElement {
  const handleKey = useCallback(({ pathname }: Location): string => pathname, []);

  return (
    <>
      <ScrollRestoration
        getKey={handleKey}
      />
      <Outlet />
    </>
  );
}
