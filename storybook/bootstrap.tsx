import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { createRouter } from './router';

const el = document.createElement('div');

document.body.appendChild(el);

const router = createRouter();

createRoot(el).render(
  <StrictMode>
    <RouterProvider
      router={router}
    />
  </StrictMode>,
);
