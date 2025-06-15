import { createBrowserRouter } from 'react-router';
import { ButtonsRoute } from './routes/ButtonsRoute';
import { IndexRoute } from './routes/IndexRoute';
import { ReactAriaProviderRoute } from './routes/ReactAriaProviderRoute';
import { ScrollRestorationRoute } from './routes/ScrollRestorationRoute';
import { SentinelRoute } from './routes/SentinelRoute';

export function createRouter() {
  return createBrowserRouter([
    {
      element: <SentinelRoute />,
      children: [
        {
          element: <ReactAriaProviderRoute />,
          children: [
            {
              element: <ScrollRestorationRoute />,
              children: [
                {
                  index: true,
                  element: <IndexRoute />,
                },
                {
                  path: 'buttons',
                  element: <ButtonsRoute />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
}
