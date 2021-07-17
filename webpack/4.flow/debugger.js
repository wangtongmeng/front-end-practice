const webpack = require('./webpack');
const webpackOptions = require('./webpack.config');
//compiler代表整个编译过程.
const compiler = webpack(webpackOptions);
//调用它的run方法可以启动编译
debugger
compiler.run((err,stats)=>{
    console.log(err);
    let result = stats.toJson({
        files:true,//产出了哪些文件
        assets:true,//生成了那些资源
        chunk:true,//生成哪些代码块
        module:true,//模块信息
        entries:true //入口信息
    });
    console.log(JSON.stringify(result,null,2));
});