import type { FC, ReactNode } from 'react';
import { Router } from './Router';
import { ErrorBoundary } from './errors/ErrorBoundary';

export const App: FC = (): ReactNode => {
  return (
    <ErrorBoundary assign={new URL('/', location.origin)}>
      <Router />
    </ErrorBoundary>
  );
};
