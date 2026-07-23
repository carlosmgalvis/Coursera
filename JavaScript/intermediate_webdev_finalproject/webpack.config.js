const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    entry: "./script.js",
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: "./favicon.ico",
        })
    ],
    output: {
        clean: true,
        libraryTarget: 'window'
    },
    module: {
        rules: [
            {
                test: /\.(css)$/i,
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]",
                },
            },
        ],
    },
};