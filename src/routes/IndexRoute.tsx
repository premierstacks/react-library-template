import { Surface, useDevice, YouBackgroundPadding, YouCommonLink, YouRectShape, YouSurfacePadding, YouTopAppBar } from '@premierstacks/material-design-you-react-aria-stack';
import * as stylex from '@stylexjs/stylex';
import type { FC, ReactElement } from 'react';
import { useLocale } from 'react-aria';
import { changeStrings, useTrans } from '../lang/trans';

const styles = stylex.create({
  rect: {
    width: 40,
    height: 40,
  },
  padding: {
    minHeight: '100vh',
  },
});

export const IndexRoute: FC = (): ReactElement => {
  const { phone } = useDevice();
  const trans = useTrans();
  const { locale } = useLocale();

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
          <select defaultValue={locale} onChange={(e) => void changeStrings(e.target.value)}>
            <option value="en">English</option>
            <option value="cs">Česky</option>
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
};
