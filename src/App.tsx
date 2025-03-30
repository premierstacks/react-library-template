import type { FC, ReactNode } from 'react';
import { Router } from './Router';
import { ErrorBoundary } from './errors/ErrorBoundary';

export const App: FC = (): ReactNode => {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};
