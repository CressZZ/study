const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  devtool: 'source-map',

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
 
    ]
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'index.js'
  }
};
