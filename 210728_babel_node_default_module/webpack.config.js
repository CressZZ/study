const path = require('path')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	target: ['web', 'es5'],
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['', '.js', '.ts'],
		fallback:{
		  'querystring': require.resolve('querystring')
		}
	},
	module:{
		rules: [
			{
				test: /\.(js|jsx|ts)$/,
				exclude: /(node_modules|vendor)/,
				use: [ 'babel-loader']
			},
		]
	}
}
