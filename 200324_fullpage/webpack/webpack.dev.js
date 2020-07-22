const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const gulpNormalize = require('node-normalize-scss').includePaths;
const gulpBourbon = require('node-bourbon').includePaths;

module.exports = {
  mode: 'development',
  entry: {
    'ui.promotion': [
      './src/sass/ui.promotion.scss',
      './src/js/ui.promotion.js',
    ],
    'sample.fullpage': [
      './src/sass/sample.fullpage.scss',
      './src/js/sample.fullpage.js',
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    open: true,
    openPage: [
      'html/ui.promotion.html',
      'html/sample.fullpage.html',
    ],
    writeToDisk: true
  },
  externals: { jquery: 'jQuery' },
  plugins: [
    new CleanWebpackPlugin(),
    new copyWebpackPlugin([{ from: './src/img', to: './img' }]),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new HtmlWebpackPlugin({
      chunks: [ 'ui.promotion' ],
      template: './src/ui.promotion.html',
      filename: 'html/ui.promotion.html',
    }),
    new HtmlWebpackPlugin({
      chunks: [ 'sample.fullpage' ],
      template: './src/sample.fullpage.html',
      filename: 'html/sample.fullpage.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src']
          }
        }
      },
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
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [ gulpNormalize, gulpBourbon ]
            }
          },
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js'
  }
};
