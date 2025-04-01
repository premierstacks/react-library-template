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
import { Outlet, ScrollRestoration } from 'react-router';

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

  return (
    <>
      <ScrollRestoration />
      <div {...stylex.props(tablet || desktop ? styles.desktop : null)}>
        <Outlet />
        <div {...stylex.props(phone ? styles.phone : null)} />
      </div>
      {phone ? (
        <YouNavigationBar isFixed isSurfaceContainer>
          <NavigationBarLink icon={<YouPillShape />} href="/" text="Domů" />
          <NavigationBarLink icon={<YouCircleShape />} href="/kontakt" text="Kontakt" />
          <NavigationBarLink icon={<YouFlowerShape />} href="/onas" text="O nás" />
          <NavigationBarLink icon={<YouTriangleShape />} href="/profil" text="Profl" />
        </YouNavigationBar>
      ) : (
        <YouNavigationRail isFixed isSurfaceContainer>
          <YouBackgroundPadding top bottom>
            <YouNavigationRailItems>
              <YouNavigationRailLink icon={<YouPillShape />} href="/" text="Domů" />
              <YouNavigationRailLink icon={<YouCircleShape />} href="/kontakt" text="Kontakt" />
              <YouNavigationRailLink icon={<YouFlowerShape />} href="/onas" text="O nás" />
              <YouNavigationRailLink icon={<YouTriangleShape />} href="/profil" text="Profl" />
            </YouNavigationRailItems>
          </YouBackgroundPadding>
        </YouNavigationRail>
      )}
    </>
  );
};
