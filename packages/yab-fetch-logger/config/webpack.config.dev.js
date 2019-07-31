const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const { resolve } = require('./utils');
const projectName = 'yab-fetch-logger';

const developmentConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: `${projectName}.js`,
    path: resolve('dist'),
    library: projectName,
    libraryTarget: 'umd'
  }
});

module.exports = developmentConfig;
