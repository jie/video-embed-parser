const path = require('path')
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json'],
  }
}
