/**
 * @file
 * @author Tomáš Chochola <chocholatom1997@gmail.com>
 * @copyright Copyright © 2024+ Tomáš Chochola <chocholatom1997@gmail.com> - All Rights Reserved
 *
 * @license
 *
 * This software is proprietary property of Tomáš Chochola and protected by copyright laws.
 * A valid license is required for any use or manipulation of the software or source code.
 * The full license terms are detailed in the LICENSE.md file within the source code repository.
 *
 * @see {@link https://github.com/tomchochola} Personal GitHub
 * @see {@link https://premierstacks.com} Premierstacks website
 * @see {@link https://github.com/premierstacks} Premierstacks GitHub
 * @see {@link https://github.com/sponsors/tomchochola} GitHub Sponsors
 */

import { browserTypescriptReactApp, chunks, copy, html } from '@premierstacks/webpack-stack';

export default function (env, argv) {
  const config = browserTypescriptReactApp(env, argv);

  config.entry = { index: ['./src/index.tsx', './src/index.scss'] };

  config.output.publicPath = '/';

  html(env, argv, config, { inject: true, template: './src/index.html', filename: 'index.html', chunks: ['index'] });
  chunks(env, argv, config);
  copy(env, argv, config, { patterns: [{ from: './public', to: '.' }] });

  return config;
}
