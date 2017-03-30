const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './examples/index'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'video-embed-parser.js',
    publicPath: '/dist/'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-addons-css-transition-group': 'React.addons.CSSTransitionGroup',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /draftjs-to-markdown\.js$|immutable\.js$|draftjs-utils\.js$|draftjs-to-html\.js$|lodash\.js$/,
      },
      {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ]
  },
  plugins: [
    // new ExtractTextPlugin("main.css"),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer, precss],
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.json'],
  },
}
