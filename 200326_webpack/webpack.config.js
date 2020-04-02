const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	// module: {
		// rules: [
		// 	{
		// 		include: [path.resolve(__dirname, 'src')],
		// 		loader: 'babel-loader',

		// 		options: {
		// 			plugins: ['syntax-dynamic-import'],

		// 			presets: [
		// 				[
		// 					'@babel/preset-env',
		// 					{
		// 						modules: false
		// 					}
		// 				]
		// 			]
		// 		},

		// 		test: /\.js$/
		// 	}
		// ]
	// },

	entry: {
		vendor1: './src/vendor1',
		vendor2: './src/vendor2',
		vendor3: './src/vendor3',
	},

	output: {
		// filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	mode: 'development',
	devtool:'source-map',
	plugins: [
		new CleanWebpackPlugin(),
		// new BundleAnalyzerPlugin()
	],
	optimization: {
		splitChunks: {
		
			cacheGroups: {
				test:{
					minChunks: 2,
					minSize: 0,
					chunks: 'all'
				},
			}
	
		}
	}
};
