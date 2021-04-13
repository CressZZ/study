const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {'ui.preorder':["./src/js/index.js","./src/scss/index.scss"]},
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new HtmlWebpackPlugin(),
  ],
  output:{
    filename: "js/[name].js",
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [],
        loader: "babel-loader",
      },
      {
        test: /.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options:{
              postcssOptions:{
                plugins:[
                  'autoprefixer'
                ]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test:/\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options:{
          publicPath:'../img',
          outputPath:'img'
        }
      },
    ],
  },
};
