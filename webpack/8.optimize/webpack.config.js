const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const bootstrap = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        main:  './src/index.js',
        vendor: ['lodash']
    },
    output: {
        path: path.resolve('build'),
        filename: "[name].js"
    },
    resolve: {
        alias: {
            bootstrap
        }
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}