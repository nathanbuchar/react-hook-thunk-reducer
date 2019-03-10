const path = require('path');

module.exports = {
  entry: path.resolve('src/thunk-reducer.js'),
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('dist'),
    filename: 'thunk-reducer.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
