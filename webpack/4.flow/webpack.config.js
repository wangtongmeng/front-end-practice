const path = require('path');
const RunPlugin = require('./plugins/run-plugin');
const DonePlugin = require('./plugins/done-plugin');
const AssetPlugin = require('./plugins/assets-plugin');
module.exports = {
    mode:'development',
    devtool:false,
    context:process.cwd(),//上下文目录, ./src .默认代表根目录 默认值其实就是当前命令执行的时候所在的目录
    entry:{
        entry1:'./src/entry1.js',
        entry2:'./src/entry2.js'
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].js'
    },
    resolve:{
        extensions:['.js','.jsx','.json']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    path.resolve(__dirname,'loaders','logger1-loader.js'),
                    path.resolve(__dirname,'loaders','logger2-loader.js')
                ]
            }
        ]
    },
    plugins:[
        new RunPlugin(),
        new DonePlugin(),
        new AssetPlugin()
    ]
}