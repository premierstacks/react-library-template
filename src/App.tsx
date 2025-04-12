import { type FC, type ReactNode } from 'react';
import { Router } from './Router';
import { ErrorBoundary } from './errors/ErrorBoundary';
import { LocaleProvider } from './lang/trans';

export const App: FC = (): ReactNode => {
  return (
    <ErrorBoundary>
      <LocaleProvider>
        <Router />
      </LocaleProvider>
    </ErrorBoundary>
  );
};
