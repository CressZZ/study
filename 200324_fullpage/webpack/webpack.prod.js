const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const gulpNormalize = require('node-normalize-scss').includePaths;
const gulpBourbon = require('node-bourbon').includePaths;

module.exports = {
  mode: 'production',
  entry: {
    'ui.promotion': [
      './src/sass/ui.promotion.scss',
      './src/js/ui.promotion.js'
    ]
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({}),
      new OptimizeCssAssetsWebpackPlugin({})
    ],
  },
  externals: { jquery: 'jQuery' },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' })
  ],
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
              includePaths: [ 'node_modules', gulpNormalize, gulpBourbon ]
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
