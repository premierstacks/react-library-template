import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

document.addEventListener('DOMContentLoaded', (): void => {
  const el = document.createElement('div');

  document.body.appendChild(el);

  createRoot(el).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
