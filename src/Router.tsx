import type { FC, ReactElement } from 'react';
import { RouterProvider as AriaRouterProvider } from 'react-aria';
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration, useHref, useNavigate, type NavigateOptions, type To } from 'react-router';
import { RouteErrorBoundary } from './errors/RouteErrorBoundary';
import { IndexRoute } from './routes/IndexRoute';
import { NotFoundRoute } from './routes/NotFoundRoute';
import { RootRoute } from './routes/RootRoute';

export const ReactAriaProvider: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    // eslint-disable-next-line react-compiler/react-compiler
    <AriaRouterProvider navigate={(to: To, opts: NavigateOptions | undefined) => void navigate(to, opts)} useHref={useHref}>
      <ScrollRestoration />
      <Outlet />
    </AriaRouterProvider>
  );
};

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

export const Router: FC = (): ReactElement => {
  return <RouterProvider router={router} />;
};
