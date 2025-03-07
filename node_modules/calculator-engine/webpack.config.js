const path = require('path');

module.exports = {
    mode: "production",
    devtool: "inline-source-map",
    entry: "./src/build.ts",
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "calculator-engine.js" // <--- Will be compiled to this single file
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        }]
    },
};