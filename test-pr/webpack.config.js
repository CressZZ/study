const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: ['./src/js/app.ts', './src/scss/index.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type:'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 0kb
          }
        },
        generator: {
          filename: 'img/[name][ext]',
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              // sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          // ['css-loader',{sourceMap: true}],
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],

        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin(
      `Project : ${pkg.name}\nAuthor  : ${
        pkg.author
      }\nUpdate  : ${new Date().toLocaleString()}`
    ),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/html/index.html'),
      filename: 'html/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'static'),
    },
    open: 'html/index.html',
    hot: true,
    port: 3005,
  },
  devtool: 'eval-source-map',
};
