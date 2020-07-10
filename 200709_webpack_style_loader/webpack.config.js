const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.scss',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
	  rules: [
		{
			test: /\.scss$/i,
			use: [ 'style-loader', 'css-loader', 'sass-loader' ]
		},
		
	  ]
  },
  plugins: [new HtmlWebpackPlugin()]
};