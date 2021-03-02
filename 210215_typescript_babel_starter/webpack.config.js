
module.exports = {
	mode: 'development',
	resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
	module: {
		rules: [
			{
				test: /\.js$|\.ts$/,
				use: [ 'babel-loader']
			}
		]
	}
};