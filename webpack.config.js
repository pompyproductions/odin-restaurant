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
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
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
    devServer: {
        static: path.resolve(__dirname, "dist")
    },
    // optimization: {
    //     runtimeChunk: 'single',
    // },
  };