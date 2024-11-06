import { FC, ReactNode } from 'react';
import { Router } from './Router';

export const App: FC = (): ReactNode => {
  return (
    <div>
      <Router />
    </div>
  );
};
