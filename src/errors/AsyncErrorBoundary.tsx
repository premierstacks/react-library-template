import { useEffect, type FC, type ReactNode } from 'react';
import { useAsyncError } from 'react-router';
import { observeError } from '../observability';

export const AsyncErrorBoundary: FC<{ children?: ReactNode; assign?: URL; replace?: URL; handle?: (error: unknown) => void }> = ({ children, assign, replace, handle }): ReactNode => {
  const error = useAsyncError();

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
