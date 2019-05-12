const path = require('path');

module.exports = {
  mode: 'development', 
  entry: './_src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'https://lineagem.plaync.com/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      }
    },
    port:3000,
  }

};