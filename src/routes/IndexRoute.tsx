import type { ReactElement } from 'react';
import { useMeta } from '../lang/seo';
import { useTrans } from '../lang/trans';

export function IndexRoute(): ReactElement {
  const trans = useTrans();

  useMeta({
    title: trans.format('routes.index.title'),
    keywords: trans.format('routes.index.keywords'),
    description: trans.format('routes.index.description'),
  });

  return (
    <main>
      <h1>
        {trans.format('routes.index.h1')}
      </h1>
    </main>
  );
}
