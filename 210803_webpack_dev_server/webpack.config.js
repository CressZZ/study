const path = require("path");
const webpack = require('webpack')
module.exports = {
  mode: "development",
  entry: "./app/index.js",
  target: "web",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  devtool: "eval-source-map",
  devServer: {
    // public:'opdev.lineagem.plaync.com',
    publicPath: "/dist/",
    port: 9001,
    hot: true,
    proxy: {
      // '/test':{

      //   target: 'http://localhost:9001',
      //   // target: 'http://l',
      //   changeOrigin: true
      // },
      // '/common':{
      //   target: 'https://op-wstatic.ncsoft.com',
      //   // target: 'http://l',
      //   changeOrigin: true
      // },
      '*': {
        target: 'http://opdev.lineagem.plaync.com',
        // target: 'http://l',
        changeOrigin: true
      },
      'https://op-wstatic.ncsoft.com': {
        target: 'http://localhost:3000',
        // target: 'http://l',
        changeOrigin: true,
        router:{
          'localhost:9001':'http://localhost:3000'
        }
      }
    }
    // proxy: [
    //   {
    //     context:['*'],
    //     target:'http://opdev.lineagem.plaync.com',
    //     changeOrigin: true
    //   }
    // ],


  },

};
