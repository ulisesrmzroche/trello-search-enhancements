const ENV = require('./environment');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  context: `${ENV.ROOT_PATH}`,
  entry: [
    'whatwg-fetch',
    `${ENV.ROOT_PATH}/src/index.jsx`,
  ],
  output: {
    path: `${ENV.ROOT_PATH}/dist`,
    filename: '[name].trello-team-search.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV ? `"${process.env.NODE_ENV}"` : false,
      'process.env.TRELLO_DEV_KEY': `"${process.env.TRELLO_DEV_KEY}"`,
      'process.env.TRELLO_DEV_TOKEN': `"${process.env.TRELLO_DEV_TOKEN}"`,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    process.env.NODE_ENV !== 'development' && new webpack.optimize.UglifyJsPlugin({
      debug: true,
      minimize: true,
      sourceMap: false,
      output: {
        comments: false,
      },
      compressor: {
        warnings: false,
        drop_console: true,
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
    },
  },
  module: {
    rules: [
      // JAVASCRIPTS
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: `${ENV.ROOT_PATH}/tmp`,
            },
          },
        ],
        include: `${ENV.ROOT_PATH}/src`,
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
};
