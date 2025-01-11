import { browserTypescriptReactApp, compress, copy, html, isWebpackProduction, optimize, vendorChunks } from '@premierstacks/webpack-stack';
import webpack from 'webpack';

export default function (env, argv) {
  const config = browserTypescriptReactApp(env, argv);

  config.entry = {
    js: ['./src/index.tsx'],
    css: [
      'sanitize.css/sanitize.css',
      'sanitize.css/forms.css',
      'sanitize.css/assets.css',
      'sanitize.css/typography.css',
      'sanitize.css/reduce-motion.css',
      'sanitize.css/system-ui.css',
      'sanitize.css/ui-monospace.css',
      './src/index.scss',
    ],
  };

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      API_DNS: isWebpackProduction(env, argv) ? 'https://api.premierstacks.com' : 'http://localhost:8000',
    }),
  );

  vendorChunks(env, argv, config);
  optimize(env, argv, config);
  compress(env, argv, config);

  html(env, argv, config, { inject: true, template: './src/index.html', filename: 'index.html', chunks: ['index'] });
  copy(env, argv, config, { patterns: [{ from: './public', to: '.' }] });

  return config;
}
