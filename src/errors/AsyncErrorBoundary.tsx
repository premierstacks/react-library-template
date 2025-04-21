import { useEffect, type FC, type ReactElement } from 'react';
import { useAsyncError } from 'react-router';

export const AsyncErrorBoundary: FC<{ children?: ReactElement; assign?: URL; replace?: URL }> = ({ children, assign, replace }): ReactElement | undefined => {
  const error = useAsyncError();

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
