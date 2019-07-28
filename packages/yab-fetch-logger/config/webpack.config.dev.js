const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const developmentConfig = merge(baseConfig, {
  mode: 'development',
  devServer: {
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    historyApiFallback: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    port: 8080, // Defaults to 8080
    // overlay: true is equivalent
    overlay: {
      errors: true,
      warnings: false
    },
    disableHostCheck: true,
    // 配合 FriendlyErrorsWebpackPlugin, 只展示 Friendly 处理后的
    quiet: true

    // publicPath 设置的话， 是使得 bundle 的文件，在此路径下访问
    // publicPath: '/assets/',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     pathRewrite: { '^/api': '' }
    //   }
    // }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true })
  ]
});

module.exports = developmentConfig;
