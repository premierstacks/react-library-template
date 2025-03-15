import { browserTypescriptReactApp, copy, getAppEnv, getNodeEnv, getWebpackMode, html } from '@premierstacks/webpack-stack';
import { execSync } from 'child_process';
import webpack from 'webpack';

export default async function (env, argv) {
  const config = browserTypescriptReactApp(env, argv);

  config.devServer.port = 3000;
  config.output.publicPath = '/';

  config.entry = {
    index: './src/index.ts',
  };

  const webpackMode = getWebpackMode(env, argv);
  const nodeEnv = getNodeEnv(env, argv);
  const appEnv = getAppEnv(env, argv);

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
      WEBPACK_MODE: webpackMode,
      APP_ENV: appEnv,
      APP_NAME: process.env.npm_package_name,
      APP_VERSION: process.env.npm_package_version || execSync('git rev-parse HEAD').toString().trim(),
    }),
  );

  config.plugins.push(
    new webpack.ProvidePlugin({
      global: 'globalThis',
    }),
  );

  html(env, argv, config, { inject: true, template: './src/index.html', filename: 'index.html', chunks: ['index'], publicPath: '/' });
  copy(env, argv, config, { patterns: [{ from: './public', to: '.' }] });

  return config;
}
