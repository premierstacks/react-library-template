import { FC, ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorRoute } from './routes/ErrorRoute';
import { IndexRoute } from './routes/IndexRoute';
import { NotFoundRoute } from './routes/NotFoundRoute';
import { RootRoute } from './routes/RootRoute';

const router = createBrowserRouter([
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
]);

export const Router: FC = (): ReactNode => {
  return <RouterProvider router={router} />;
};
