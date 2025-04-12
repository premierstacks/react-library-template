import { use } from 'react';

export type WrappedPromise<T> = Promise<T> &
  ({ status: 'pending'; value: undefined; reason: undefined } | { status: 'fulfilled'; value: T; reason: undefined } | { status: 'rejected'; value: undefined; reason: unknown });

export function wrapPromise<T>(promise: Promise<T>): WrappedPromise<T> {
  const wrapped = promise.then(
    (value: T) => {
      wrapped.status = 'fulfilled';
      wrapped.value = value;
      wrapped.reason = undefined;
      return value;
    },
    (reason: unknown) => {
      wrapped.status = 'rejected';
      wrapped.reason = reason;
      wrapped.value = undefined;
      throw reason;
    },
  ) as WrappedPromise<T>;

  wrapped.status = 'pending';
  wrapped.value = undefined;
  wrapped.reason = undefined;

  return wrapped;
}

export function usePromise<T>(promise: WrappedPromise<T>): T {
  if (promise.status === 'fulfilled') {
    return promise.value;
  }

  return use(promise);
}
