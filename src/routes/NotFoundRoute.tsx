import type { ReactElement } from 'react';
import { useMeta } from '../lang/seo';
import { useTrans } from '../lang/trans';

export function NotFoundRoute(): ReactElement {
  const trans = useTrans();

  useMeta({
    title: trans.format('seo.404.title'),
    keywords: trans.format('seo.404.keywords'),
    description: trans.format('seo.404.description'),
  });

  return (
    <main>
      <h1>{trans.format('404')}</h1>
    </main>
  );
}
