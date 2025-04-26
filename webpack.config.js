import { applyWebpackPluginHtml, createWebpackConfigBrowserTypescriptBabelReactApp, getNodeEnv, getWebpackMode } from '@premierstacks/webpack-stack';
import { execSync } from 'child_process';
import webpack from 'webpack';

export default function (env, argv) {
  const webpackMode = getWebpackMode(env, argv);
  const nodeEnv = getNodeEnv(env, argv);
  const appEnv = env.APP_ENV ?? process.env.APP_ENV ?? webpackMode;

  const config = createWebpackConfigBrowserTypescriptBabelReactApp(env, argv);

  config.devServer = config.devServer ?? {};
  config.devServer.port = 3000;

  config.entry = {
    index: './prototype/index.ts',
  };

  config.plugins = config.plugins ?? [];
  config.plugins.push(
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
      WEBPACK_MODE: webpackMode,
      APP_NAME: process.env.npm_package_name ?? 'library',
      APP_VERSION: process.env.npm_package_version ?? execSync('git rev-parse HEAD').toString().trim() ?? 'latest',
      APP_ENV: appEnv,
    }),
  );

  config.plugins = config.plugins ?? [];
  config.plugins.push(
    new webpack.DefinePlugin({
      global: 'globalThis',
    }),
  );

  if (appEnv === 'playwright') {
    config.devServer.client = config.devServer.client ?? {};
    config.devServer.client.overlay = false;
  }

  applyWebpackPluginHtml(env, argv, config, { inject: true, template: './prototype/index.html', filename: 'index.html', chunks: ['index'], publicPath: '/' });

  return config;
}
