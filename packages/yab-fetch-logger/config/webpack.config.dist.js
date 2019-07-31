const merge = require('webpack-merge');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./webpack.config.base');
const { resolve } = require('./utils');
const projectName = 'yab-fetch-logger';

const productionConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: `${projectName}.min.js`,
    path: resolve('dist'),
    library: projectName,
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin()]
  }
});

module.exports = productionConfig;
