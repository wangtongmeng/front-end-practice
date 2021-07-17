const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',//包括module  cheap-source-map
    context: process.cwd(),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolveLoader: {//设置如何找loader
        alias: {
            //'babel-loader':resolve('./loaders/babel-loader.js')
        },
        modules: [path.resolve('./loaders'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        sourceMaps: true,//如果这个参数不传,默认值false,不会生成sourceMap
                    }
                }]
            },
            {
                test:/\.(jpg|gif|png)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            filename:'[hash].[ext]',
                            limit:800*1024,
                            fallback:path.resolve('./loaders/file-loader.js')
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',//生成一段JS脚本,向页面插入style标签,style的内容就是css文本
                    'less-loader'//把less编译成css
                ]
            }
            // {
            //     test: /\.js$/,
            //     use: ['normal1-loader', 'normal2-loader'] //普通
            // },
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     use: ['pre1-loader', 'pre2-loader'] //前置 
            // },
            // {
            //     enforce: 'post',
            //     test: /\.js$/,
            //     use: ['post1-loader', 'post2-loader'] //后置
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}