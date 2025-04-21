import {
  NavigationBarLink,
  useDevice,
  YouBackgroundPadding,
  YouCircleShape,
  YouFlowerShape,
  YouNavigationBar,
  YouNavigationRail,
  YouNavigationRailItems,
  YouNavigationRailLink,
  YouPillShape,
  YouTriangleShape,
} from '@premierstacks/material-design-you-react-aria-stack';
import * as stylex from '@stylexjs/stylex';
import type { ReactElement } from 'react';
import { Outlet } from 'react-router';
import { useTrans } from '../lang/trans';

const styles = stylex.create({
  desktop: {
    paddingLeft: 88,
  },
  phone: {
    height: 80,
  },
});

export function RootRoute(): ReactElement {
  const { tablet, phone, desktop } = useDevice();
  const trans = useTrans();

  return (
    <>
      <div {...stylex.props(tablet || desktop ? styles.desktop : null)}>
        <Outlet />
        <div {...stylex.props(phone ? styles.phone : null)} />
      </div>
      {phone ? (
        <YouNavigationBar isFixed isSurfaceContainer>
          <NavigationBarLink href="/" icon={<YouPillShape />} text={trans.format('link.home')} />
          <NavigationBarLink href="/contact" icon={<YouCircleShape />} text={trans.format('link.contact')} />
          <NavigationBarLink href="/about" icon={<YouFlowerShape />} text={trans.format('link.about')} />
          <NavigationBarLink href="/profile" icon={<YouTriangleShape />} text={trans.format('link.profile')} />
        </YouNavigationBar>
      ) : (
        <YouNavigationRail isFixed isSurfaceContainer>
          <YouBackgroundPadding bottom top>
            <YouNavigationRailItems>
              <YouNavigationRailLink href="/" icon={<YouPillShape />} text={trans.format('link.home')} />
              <YouNavigationRailLink href="/contact" icon={<YouCircleShape />} text={trans.format('link.contact')} />
              <YouNavigationRailLink href="/about" icon={<YouFlowerShape />} text={trans.format('link.about')} />
              <YouNavigationRailLink href="/profile" icon={<YouTriangleShape />} text={trans.format('link.profile')} />
            </YouNavigationRailItems>
          </YouBackgroundPadding>
        </YouNavigationRail>
      )}
    </>
  );
}
