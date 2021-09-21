const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: path.resolve("./src/index.tsx")
    },
    output: {
        path: path.resolve("./build/dist"),
        filename: "[name].[contenthash].js",
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                loader: "ts-loader",
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            // webpack new feature asset modules
            {
                test: /\.(png|jpe?g)$/,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1,
                    }
                },
                generator: {
                    filename: "[name].[hash].[ext]"
                }
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [
            path.resolve("./node_modules"),
            path.resolve("./src")
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            minSize: 1000,
            maxSize: 1000000,
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: 10,
                    enforce: true,
                },
                reactVendor: {
                    chunks: "all",
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'reactVendor',
                    priority: 11,
                    enforce: true,
                },
            },
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
                template: path.resolve("./src/static/index.html"),
            }
        ),
        new MiniCssExtractPlugin(),
    ],
}
