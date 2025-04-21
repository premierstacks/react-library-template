import type { FC, ReactElement } from 'react';
import { Router } from './Router';
import { ErrorBoundary } from './errors/ErrorBoundary';
import { LocaleProvider } from './lang/trans';

export const App: FC = (): ReactElement => {
  return (
    <ErrorBoundary>
      <LocaleProvider>
        <Router />
      </LocaleProvider>
    </ErrorBoundary>
  );
};
