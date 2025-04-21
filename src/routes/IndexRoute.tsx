import { Surface, useDevice, YouBackgroundPadding, YouCommonLink, YouRectShape, YouSurfacePadding, YouTopAppBar } from '@premierstacks/material-design-you-react-aria-stack';
import * as stylex from '@stylexjs/stylex';
import { useCallback, type ChangeEvent, type ReactElement } from 'react';
import { useLocale } from 'react-aria';
import { changeStrings, useTrans } from '../lang/trans';

const styles = stylex.create({
  rect: {
    height: 40,
    width: 40,
  },
  padding: {
    minHeight: '100vh',
  },
});

export function IndexRoute(): ReactElement {
  const { phone } = useDevice();
  const trans = useTrans();
  const { locale } = useLocale();

  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => void changeStrings(e.target.value), []);

  return (
    <YouBackgroundPadding bottom={!phone} right={!phone}>
      <YouSurfacePadding left={phone} right={phone}>
        <YouTopAppBar
          isSurfaceContainer
          leading={<YouRectShape xstyle={styles.rect} />}
          trailing={
            <YouCommonLink href="/host/prihlaseni" isText>
              {trans.format('login')}
            </YouCommonLink>
          }
        >
          <select defaultValue={locale} onChange={handleChange}>
            <option value="en">{trans.format('locale.en')}</option>
            <option value="cs">{trans.format('locale.cs')}</option>
          </select>
        </YouTopAppBar>
      </YouSurfacePadding>
      <main>
        <Surface bl br tl tr>
          <YouSurfacePadding bottom left right top xstyle={styles.padding}>
            {trans.format('index')}
          </YouSurfacePadding>
        </Surface>
      </main>
    </YouBackgroundPadding>
  );
}
