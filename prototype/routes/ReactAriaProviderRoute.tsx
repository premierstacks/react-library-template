import { useCallback, type ReactElement } from 'react';
import { RouterProvider as AriaRouterProvider } from 'react-aria-components';
import { Outlet, useHref, useNavigate, type NavigateOptions, type To } from 'react-router';

export function ReactAriaProviderRoute(): ReactElement {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (to: To, opts: NavigateOptions | undefined): void => {
      void navigate(to, opts);
    },
    [navigate],
  );

  return (

    <AriaRouterProvider
      navigate={handleNavigate}
      // eslint-disable-next-line react-compiler/react-compiler
      useHref={useHref}
    >
      <Outlet />
    </AriaRouterProvider>
  );
}
