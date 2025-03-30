import { useEffect, type FC, type ReactNode } from 'react';
import { useRouteError } from 'react-router';

export const RouteErrorBoundary: FC<{ children?: ReactNode; assign?: URL; replace?: URL }> = ({ children, assign, replace }): ReactNode => {
  const error = useRouteError();

  useEffect(() => {
    window.dispatchEvent(new ErrorEvent('error', { error }));
  }, [error]);

  useEffect(() => {
    if (assign !== undefined && assign.toString() !== location.toString()) {
      location.assign(assign);
    }
  }, [assign]);

  useEffect(() => {
    if (replace !== undefined && replace.toString() !== location.toString()) {
      location.replace(replace);
    }
  }, [replace]);

  return children;
};
