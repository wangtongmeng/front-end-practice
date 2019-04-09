var path = require('path')
var webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    context:path.resolve(__dirname,'./src'),
    entry:{
        app:'./app.js'
    },
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[
    ],
    //压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    },
}