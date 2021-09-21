// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require("./commonConfig");
const chalk = require("chalk");

console.info(chalk.bold.hex("#09d7d7")("Starting dev-server... 🚀"))
module.exports = {
    ...config,
    mode: "development",
    plugins: [
        ...config.plugins,
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 12345,
        //     openAnalyzer: false,
        // }),
    ],

    devServer: {
        port: 3333,
        proxy: {
            "/opensea_proxy/": {
                target: "http://localhost:5000"
            }
        },
        open: true,
    },
    devtool: "eval-cheap-module-source-map",
}