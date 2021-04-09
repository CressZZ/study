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
        // 위에거 deprecated 
        // removed the sourceMap option (respect the devtool option by default) 2020-1014
        // https://github.com/webpack-contrib/terser-webpack-plugin/blob/master/CHANGELOG.md
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  }
};