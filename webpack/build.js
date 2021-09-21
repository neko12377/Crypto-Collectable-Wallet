const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const config = require("./commonConfig");
const chalk = require("chalk");


console.info(chalk.bold.hex("#09d7d7")("BUILDING...🛠️"));
module.exports = {
    ...config,
    mode: "production",

    plugins: [
        new CleanWebpackPlugin(),
    ],
}