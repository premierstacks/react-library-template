import { createBrowserRouter } from 'react-router';
import { IndexRoute } from './routes/IndexRoute';
import { ReactAriaProviderRoute } from './routes/ReactAriaProviderRoute';
import { ScrollRestorationRoute } from './routes/ScrollRestorationRoute';
import { SentinelRoute } from './routes/SentinelRoute';
import { SplitRoute } from './routes/SplitRoute';
import { ButtonsRoute } from './routes/ButtonsRoute';

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
                  element: <SplitRoute />,
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
      ],
    },
  ]);
}
