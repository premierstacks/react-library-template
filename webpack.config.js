import { applyWebpackPluginHtml, createWebpackConfigBrowserTypescriptReactBabelApp, getNodeEnv, getWebpackMode } from '@premierstacks/webpack-stack';
import { execSync } from 'child_process';
import webpack from 'webpack';

export default async function (env, argv) {
  const config = createWebpackConfigBrowserTypescriptReactBabelApp(env, argv);

  config.devServer.port = 3000;

  config.entry = {
    index: ['./prototype/index.scss', './prototype/index.ts'],
  };

  const webpackMode = getWebpackMode(env, argv);
  const nodeEnv = getNodeEnv(env, argv);

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
      WEBPACK_MODE: webpackMode,
      APP_NAME: process.env.npm_package_name || 'library',
      APP_VERSION: process.env.npm_package_version || execSync('git rev-parse HEAD').toString().trim() || 'latest',
      APP_ENV: process.env.APP_ENV || webpackMode,
    }),
  );

  config.plugins.push(
    new webpack.DefinePlugin({
      global: 'globalThis',
    }),
  );

  applyWebpackPluginHtml(env, argv, config, { inject: true, template: './prototype/index.html', filename: 'index.html', chunks: ['index'], publicPath: '/' });

  return config;
}
