import { Surface, useDevice, YouBackgroundPadding, YouCommonLink, YouRectShape, YouSurfacePadding, YouTopAppBar } from '@premierstacks/material-design-you-react-aria-stack';
import * as stylex from '@stylexjs/stylex';
import { type FC, type ReactNode } from 'react';

const styles = stylex.create({
  rect: {
    width: 40,
    height: 40,
  },
  padding: {
    minHeight: '100vh',
  },
});

export const IndexRoute: FC = (): ReactNode => {
  const { phone } = useDevice();

  return (
    <YouBackgroundPadding right={!phone} bottom={!phone}>
      <YouSurfacePadding left={phone} right={phone}>
        <YouTopAppBar
          isSurfaceContainer
          leading={<YouRectShape xstyle={styles.rect} />}
          trailing={
            <YouCommonLink isText href="/host/prihlaseni">
              Přihlásit se
            </YouCommonLink>
          }
        >
          <span />
        </YouTopAppBar>
      </YouSurfacePadding>
      <main>
        <Surface tl tr bl br>
          <YouSurfacePadding top left right bottom xstyle={styles.padding}>
            IndexRoute
          </YouSurfacePadding>
        </Surface>
      </main>
    </YouBackgroundPadding>
  );
};
