const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const ChromeReloadPlugin = require('wcer')
const baseWebpack = require('./webpack.base')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { styleLoaders } = require('./tools')
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');

module.exports = merge(baseWebpack, {
  // cheap-module-eval-source-map быстрее для разработки
  watch: true,
  module: {
    rules: styleLoaders({ sourceMap: false })
  },
  devtool: '#source-map',
  plugins: [
    new ChromeExtensionReloader(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new FriendlyErrorsPlugin(),
    new ChromeReloadPlugin({
      port: 9090,
      reloadPage: true,
      manifest: path.join(__dirname, '..', 'src', 'manifest.js')
    })
  ]
})
