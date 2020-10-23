const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  entry: './index.js',
  mode: 'development',
  devtool: 'source-map',  
//   devtool: 'nosources-source-map', 
//   devtool: 'hidden-source-map', 
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  }
};