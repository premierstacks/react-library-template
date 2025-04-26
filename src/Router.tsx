import { useCallback, type ReactElement } from 'react';
import { RouterProvider as AriaRouterProvider } from 'react-aria';
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration, useHref, useNavigate, type Location, type NavigateOptions, type To } from 'react-router';
import { RouteErrorBoundary } from './errors/RouteErrorBoundary';
import { IndexRoute } from './routes/IndexRoute';
import { NotFoundRoute } from './routes/NotFoundRoute';
import { RootRoute } from './routes/RootRoute';

export function ReactAriaProvider(): ReactElement {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (to: To, opts: NavigateOptions | undefined): void => {
      void navigate(to, opts);
    },
    [navigate],
  );

  const handleKey = useCallback(({ pathname }: Location): string => pathname, []);

  return (
    // eslint-disable-next-line react-compiler/react-compiler
    <AriaRouterProvider navigate={handleNavigate} useHref={useHref}>
      <ScrollRestoration getKey={handleKey} />
      <Outlet />
    </AriaRouterProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <ReactAriaProvider />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '/',
        element: <RootRoute />,
        children: [
          {
            index: true,
            element: <IndexRoute />,
          },
          {
            path: '*',
            element: <NotFoundRoute />,
          },
        ],
      },
    ],
  },
]);

export function Router(): ReactElement {
  return <RouterProvider router={router} />;
}
