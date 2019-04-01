'use strict';

const { resolve } = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/client/main'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, './src/client'),
        loader: 'babel-loader'
      }
    ]
  }
};
