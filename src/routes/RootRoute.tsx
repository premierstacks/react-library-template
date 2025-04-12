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
import { type FC, type ReactNode } from 'react';
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

export const RootRoute: FC = (): ReactNode => {
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
          <NavigationBarLink icon={<YouPillShape />} href="/" text={trans.format('link.home')} />
          <NavigationBarLink icon={<YouCircleShape />} href="/contact" text={trans.format('link.contact')} />
          <NavigationBarLink icon={<YouFlowerShape />} href="/about" text={trans.format('link.about')} />
          <NavigationBarLink icon={<YouTriangleShape />} href="/profile" text={trans.format('link.profile')} />
        </YouNavigationBar>
      ) : (
        <YouNavigationRail isFixed isSurfaceContainer>
          <YouBackgroundPadding top bottom>
            <YouNavigationRailItems>
              <YouNavigationRailLink icon={<YouPillShape />} href="/" text={trans.format('link.home')} />
              <YouNavigationRailLink icon={<YouCircleShape />} href="/contact" text={trans.format('link.contact')} />
              <YouNavigationRailLink icon={<YouFlowerShape />} href="/about" text={trans.format('link.about')} />
              <YouNavigationRailLink icon={<YouTriangleShape />} href="/profile" text={trans.format('link.profile')} />
            </YouNavigationRailItems>
          </YouBackgroundPadding>
        </YouNavigationRail>
      )}
    </>
  );
};
