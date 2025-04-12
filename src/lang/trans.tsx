import { use, useEffect, useState, type FC, type ReactNode } from 'react';
import { I18nProvider, useLocale, useLocalizedStringFormatter } from 'react-aria';
import type { Strings } from './cs';

const stringsCache = new Map<string, WrappedPromise<Strings>>();

type WrappedPromise<T> = Promise<T> &
  ({ status: 'pending'; value: undefined; reason: undefined } | { status: 'fulfilled'; value: T; reason: undefined } | { status: 'rejected'; value: undefined; reason: unknown });

function wrapPromise<T>(promise: Promise<T>): WrappedPromise<T> {
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

function getStrings(locale: string): WrappedPromise<Strings> {
  const cached = stringsCache.get(locale);

  if (cached) {
    return cached;
  }

  const promise = wrapPromise(
    locale === 'cs' ? import('./cs').then((m) => m.default) : locale === 'en' ? import('./en').then((m) => m.default) : Promise.reject(new Error(`Locale ${locale} not found`)),
  );

  stringsCache.set(locale, promise);

  return promise;
}

export function changeStrings(locale: string): Promise<Strings> {
  return getStrings(locale).then((strings) => {
    changeLocale(locale);

    return strings;
  });
}

type LocaleEvent = CustomEvent<{
  locale: string | null;
}>;

export function changeLocale(locale: string | null): void {
  const event: LocaleEvent = new CustomEvent('changeLocale', { detail: { locale: locale } });

  window.dispatchEvent(event);
}

export function useTrans() {
  const { locale } = useLocale();

  const promise = getStrings(locale);

  let strings: Strings;

  if (promise.status === 'fulfilled') {
    strings = promise.value;
  } else {
    strings = use(promise);
  }

  return useLocalizedStringFormatter({ [locale]: strings });
}

export function filterLocale(locale: string | null): string | null {
  if (locale?.startsWith('cs')) {
    return 'cs';
  }

  if (locale?.startsWith('sk')) {
    return 'cs';
  }

  if (locale?.startsWith('en')) {
    return 'en';
  }

  return null;
}

export const LocaleProvider: FC<{ children: ReactNode }> = ({ children }): ReactNode => {
  const { locale: defaultLocale } = useLocale();

  const [locale, setLocale] = useState<string | null>(() => filterLocale(localStorage.getItem('locale')));

  useEffect(() => {
    const handler = (event: Event) => {
      const filteredLocale = filterLocale((event as LocaleEvent).detail.locale);

      setLocale(filteredLocale);

      if (filteredLocale !== null) {
        try {
          localStorage.setItem('locale', filteredLocale);
        } catch {
          localStorage.removeItem('locale');
        }
      } else {
        localStorage.removeItem('locale');
      }
    };

    window.addEventListener('changeLocale', handler);

    return () => {
      window.removeEventListener('changeLocale', handler);
    };
  }, [setLocale]);

  useEffect(() => {
    if (typeof requestIdleCallback === 'function' && typeof cancelIdleCallback === 'function') {
      const requestIdleTimeout = requestIdleCallback(
        () => {
          void getStrings('cs');
          void getStrings('en');
        },
        { timeout: 10000 },
      );

      return () => {
        cancelIdleCallback(requestIdleTimeout);
      };
    }

    const timeout = setTimeout(() => {
      void getStrings('cs');
      void getStrings('en');
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <I18nProvider locale={filterLocale(locale) ?? filterLocale(defaultLocale) ?? 'cs'}>{children}</I18nProvider>;
};
