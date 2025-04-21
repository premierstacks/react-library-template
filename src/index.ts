import 'core-js/actual';

import { stylexify } from '@premierstacks/material-design-you-react-aria-stack';
import { youSysColor } from '@premierstacks/material-design-you-react-aria-stack/src/vars/sys.stylex';
import * as stylex from '@stylexjs/stylex';

document.querySelectorAll('link[rel="preload"][as="style"]').forEach((link) => {
  if (link instanceof HTMLLinkElement) {
    link.rel = 'stylesheet';
  }
});

stylexify(
  document.documentElement,
  stylex.create({
    base: {
      backgroundColor: `rgb(${youSysColor.surfaceContainer})`,
      color: `rgb(${youSysColor.onSurface})`,
      scrollbarColor: `rgb(${youSysColor.outline}) transparent`,
    },
  }).base,
);

void import('./bootstrap');
