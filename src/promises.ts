interface WrappedPromise<T> extends Promise<T> {
  status: 'pending' | 'fulfilled' | 'rejected';
  value: T | undefined;
  reason: unknown;
}

export function wrapPromise<T>(promise: Promise<T>): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  const wrapped = promise as WrappedPromise<T>;

  wrapped.status = 'pending';
  wrapped.value = undefined;
  wrapped.reason = undefined;

  return wrapped.then(
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
  );
}
