import { useEffect, type FC, type ReactNode } from 'react';
import { useRouteError } from 'react-router';
import { observeError } from '../observability';

export const RouteErrorBoundary: FC<{ children?: ReactNode; assign?: URL; replace?: URL; handle?: (error: unknown) => void }> = ({ children, assign, replace, handle }): ReactNode => {
  const error = useRouteError();

  useEffect(() => {
    observeError(error);
  }, [error]);

  useEffect(() => {
    handle?.(error);
  }, [handle, error]);

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
