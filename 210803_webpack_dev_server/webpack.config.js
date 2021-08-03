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
      '/i18n':{

        target: 'http://wstatic-cdn.plaync.com',
        // target: 'http://l',
        changeOrigin: true
      }
    }
  },

};
