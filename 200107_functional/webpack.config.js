const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
module.exports = {
  mode: 'development',
  entry: './index.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader' ,
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template:'./index.html'
  })],
  output: {
    filename: 'main.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    path: path.resolve(__dirname, 'dist'),
  },
};