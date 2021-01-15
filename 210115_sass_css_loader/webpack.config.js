var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: { app: "./index.css" },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "[name]",
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
        //   {
        //     loader: MiniCssExtractPlugin.loader,
        //   },
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 2,
              sourceMap: true,
            },
          },
          // {
          // 	loader: "sass-loader",
          // 	options: {
          // 		sourceMap: true,
          // 	},
          // },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
            //   name: "[name].[ext]",
              publicPath: "./img",
              outputPath: "./images2",
            },
          },
        ],
      },
    ],
  },
};
