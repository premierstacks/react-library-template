import { browserTypescriptReactApp, copy, html } from '@premierstacks/webpack-stack';

export default function (env, argv) {
  const config = browserTypescriptReactApp(env, argv);

  config.entry = { index: ['./src/index.tsx', './src/index.scss'] };

  html(env, argv, config, { inject: true, template: './src/index.html', filename: 'index.html', chunks: ['index'] });
  copy(env, argv, config, { patterns: [{ from: './public', to: '.' }] });

  return config;
}
