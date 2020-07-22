const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'development',
    devtool:'source-map',

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './index.js'
    },
    module:{
        rules:[
            // {
            //     test: /\.css$/,
            //     use: [
            //         // {
            //         //     loader: 'style-loader'
            //         // },
            //         {
            //             loader: 'file-loader',

            //         }
            //     ]
            // }
            {
                test: /\.css$/,
                use: [
                    // {loader: 'style-loader', options:{injectType:'styleTag'}}, 
                    // {loader: MiniCssExtractPlugin.loader}, 
                            {loader: "inspect-loader",                options: {
                                callback(inspect) {
                                    console.log('----------------------------arguments--------------')
                                    console.log(inspect.arguments);
                                    console.log('----------------------------context--------------')
                                    console.log(inspect.context);
                                    console.log('----------------------------options--------------')
                                     console.log(inspect.options);
                              },
                            }},
                    {loader: 'css-loader', options:{
                        modules:{
                            localIdentName: '[local]'
                        }
                    }}
                ],
            },
            // {   
            //     test: /\.png/,
            //     use: {loader: 'url-loader'}

            // }
        ]
        // rules: [
        //     {
        //         test: /\.css$/,
        //         use: ({ resource, resourceQuery, issuer }) => {
        //             return {
        //                 loader: "css-loader", // css-loader first
        //                 rules: [
        //                     MiniCssExtractPlugin.loader, // style-loader after
        //                 ],
        //             }
        //         }
        //     }
        // ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
    ]
}
