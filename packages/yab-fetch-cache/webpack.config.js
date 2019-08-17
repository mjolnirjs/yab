/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('../../webpack.config');

const projectName = 'yab-fetch-cache';

const productionConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: `${projectName}.min.js`,
    path: path.join(__dirname, 'dist'),
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
