const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: {
        first: ['./src/first/index.js', './src/first/first_css.scss'],
        second: ['./src/second/index.js','./src/second/second_css.scss'],
        third: ['./src/third/index.js','./src/third/third_css.scss'],

        // another: './src/another-module.js'
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.chunck.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filenaem: '[name].css',
            chunkFilename: '[name].chunk.css'
        })
    ],
    optimization:{
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            // minChunks: 1,
            // cacheGroups: {
                
            //     css: {
            //         test: /\.(css|sass|scss)$/,
            //         name: "commons",
            //         // chunks: "all",
            //         minChunks: 2,
            //         minSize: 0,
            //         reuseExistingChunk: true,
            //     }
            // }
        },
        minimize: false,
    },

    module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // you can specify a publicPath here
                  // by default it uses publicPath in webpackOptions.output
                  publicPath: '../',
                //   hmr: process.env.NODE_ENV === 'development',
                },
              },
              'css-loader',
              'sass-loader'
            ],
          },
        ],
      },
};
