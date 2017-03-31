const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './docs/index',
  ],
  output: {
    path: path.join(__dirname, '../docs'),
    filename: 'bundle.min.js'
    // libraryTarget: 'commonjs2',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-addons-css-transition-group': 'React.addons.CSSTransitionGroup',
    'video-embed-parser': 'VideoEmbedParser'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /immutable\.js$|draftjs-utils\.js$/ }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
  }
};
