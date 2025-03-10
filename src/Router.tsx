import type { FC, ReactNode } from 'react';
import { RouterProvider as AriaRouterProvider } from 'react-aria';
import { createBrowserRouter, Outlet, RouterProvider, useHref, useNavigate, type NavigateOptions, type To } from 'react-router';
import { ErrorRoute } from './routes/ErrorRoute';
import { IndexRoute } from './routes/IndexRoute';
import { NotFoundRoute } from './routes/NotFoundRoute';
import { RootRoute } from './routes/RootRoute';

export const ReactAriaProvider: FC = (): ReactNode => {
  const navigate = useNavigate();

  return (
    <AriaRouterProvider useHref={useHref} navigate={(to: To, opts: NavigateOptions | undefined) => void navigate(to, opts)}>
      <Outlet />
    </AriaRouterProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <ReactAriaProvider />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: '/',
        element: <RootRoute />,
        errorElement: <ErrorRoute />,
        children: [
          {
            index: true,
            element: <IndexRoute />,
            errorElement: <ErrorRoute />,
          },
          {
            path: '*',
            element: <NotFoundRoute />,
            errorElement: <ErrorRoute />,
          },
        ],
      },
    ],
  },
]);

export const Router: FC = (): ReactNode => {
  return <RouterProvider router={router} />;
};
