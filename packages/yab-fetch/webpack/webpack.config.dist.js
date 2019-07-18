const merge = require('webpack-merge');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const productionConfig = merge(baseConfig, {
  mode: 'production',
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
