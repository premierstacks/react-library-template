import type { ReactElement } from 'react';
import { Router } from './Router';
import { ErrorBoundary } from './errors/ErrorBoundary';
import { LocaleProvider } from './lang/trans';

export function App(): ReactElement {
  return (
    <ErrorBoundary>
      <LocaleProvider>
        <Router />
      </LocaleProvider>
    </ErrorBoundary>
  );
}
