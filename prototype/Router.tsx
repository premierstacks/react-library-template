import type { FC, ReactNode } from 'react';
import { RouterProvider as AriaRouterProvider } from 'react-aria';
import { createBrowserRouter, Outlet, RouterProvider, useHref, useNavigate, type NavigateOptions, type To } from 'react-router';
import { IndexRoute } from './routes/IndexRoute';
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
    children: [
      {
        path: '/',
        element: <RootRoute />,
        children: [
          {
            index: true,
            element: <IndexRoute />,
          },
        ],
      },
    ],
  },
]);

export const Router: FC = (): ReactNode => {
  return <RouterProvider router={router} />;
};
