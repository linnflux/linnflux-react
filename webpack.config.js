var webpack = require('webpack'),
  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './index.js',

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.css$/, loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader') },
      { test: /\.scss$/, loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader!sass-loader') }

    ]
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextWebpackPlugin('bundle.css')
  ] : [
    new ExtractTextWebpackPlugin('bundle.css')
  ]
}