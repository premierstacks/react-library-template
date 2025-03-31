import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const el = document.createElement('div');

document.body.appendChild(el);

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
