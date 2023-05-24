const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "src/index.js")
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        assetModuleFilename: "[name][ext]"
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: "Webpack App",
            filename: "index.html",
            template: path.resolve(__dirname, "src/template.html")
        })
    ],
    devtool: "source-map",
    devServer: {
        static: path.resolve(__dirname, "dist"),
        historyApiFallback: true,
        open: true,
        hot: true
    },
    // optimization: {
    //     runtimeChunk: 'single',
    // },
  };