import { applyWebpackPluginCopy, applyWebpackPluginHtml, createWebpackConfigBrowserTypescriptBabelReactApp, getNodeEnv, getWebpackMode } from '@premierstacks/webpack-stack';
import { execSync } from 'child_process';
import webpack from 'webpack';

export default function (env, argv) {
  const config = createWebpackConfigBrowserTypescriptBabelReactApp(env, argv);

  config.devServer.port = 3000;

  config.entry = {
    index: ['./src/index.scss', './src/index.ts'],
  };

  const webpackMode = getWebpackMode(env, argv);
  const nodeEnv = getNodeEnv(env, argv);
  const appEnv = env.APP_ENV ?? process.env.APP_ENV ?? webpackMode;

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
      WEBPACK_MODE: webpackMode,
      APP_NAME: process.env.npm_package_name ?? 'app',
      APP_VERSION: process.env.npm_package_version ?? execSync('git rev-parse HEAD').toString().trim() ?? 'latest',
      APP_ENV: appEnv,
      OTLP_API_KEY: env.OTLP_API_KEY ?? process.env.OTLP_API_KEY ?? null,
    }),
  );

  config.plugins.push(
    new webpack.DefinePlugin({
      global: 'globalThis',
    }),
  );

  if (appEnv === 'playwright') {
    config.devServer.client = config.devServer.client ?? {};
    config.devServer.client.overlay = false;
  }

  applyWebpackPluginHtml(env, argv, config, { inject: true, template: './src/index.html', filename: 'index.html', chunks: ['index'], publicPath: '/' });
  applyWebpackPluginCopy(env, argv, config, { patterns: [{ from: './public', to: '.' }] });

  return config;
}
