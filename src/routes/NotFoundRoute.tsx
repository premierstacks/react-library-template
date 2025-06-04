import type { ReactElement } from 'react';
import { useMeta } from '../lang/seo';
import { useTrans } from '../lang/trans';

export function NotFoundRoute(): ReactElement {
  const trans = useTrans();

  useMeta({
    title: trans.format('routes.not_found.title'),
    keywords: trans.format('routes.not_found.keywords'),
    description: trans.format('routes.not_found.description'),
  });

  return (
    <main>
      <h1>
        {trans.format('routes.not_found.h1')}
      </h1>
    </main>
  );
}
