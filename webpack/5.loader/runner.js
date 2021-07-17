const path = require('path')
const fs = require('fs')
const { runLoaders } = require('./loader-runner');
// 入口文件
debugger
const entry = path.resolve(__dirname, 'src', 'index.js')
// 要加载的模块
//post(后置)+inline(内联)+normal(正常)+pre(前置) 后联正前
//四种loader如何区分? 放在请求串里的叫内联loader
/**
 * 在加载模块的时候可以指定一些前缀
 * -! noPreAutoLoaders 我不要执行 前置和普通的loader
 * ! noAutoLoaders 不要普通的
 * !! noPrePostAutoLoader 不要后置和普通loader,只要内联
 */
let request = `inline1-loader!inline2-loader!${entry}`;
// require(`inline1-loader!inline2-loader!${entry}`)
let rules = [
    {
        test: /\.js$/,
        use: ['normal1-loader', 'normal2-loader'] //普通
    },
    {
        enforce: 'pre',
        test: /\.js$/,
        use: ['pre1-loader', 'pre2-loader'] //前置 
    },
    {
        enforce: 'post',
        test: /\.js$/,
        use: ['post1-loader', 'post2-loader'] //后置
    }
]
/// -1 !! ! => ''
let parts = request.replace(/^-?!+/,'').split('!');//["inline1-loader","inline2-loader",entry]
let resource = parts.pop();
//把自定义loader的名称转成一个绝对路径
const resolveLoader = loader => path.resolve(__dirname, 'loader-runner', loader)
let inlineLoaders = parts;//["inline1-loader","inline2-loader"]
let preLoaders = [], normalLoaders = [], postLoaders = [];
for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    if (rule.test.test(resource)) {
        if (rule.enforce === 'pre') {
            preLoaders.push(...rule.use);
        } else if (rule.enforce === 'post') {
            postLoaders.push(...rule.use);
        }else{
            normalLoaders.push(...rule.use);
        }
    }
}

let loaders = [];
if(request.startsWith('!!')){
    loaders=inlineLoaders;
}else if(request.startsWith('-!')){
    loaders = [...postLoaders,...inlineLoaders];
}else if(request.startsWith('!')){
    loaders = [...postLoaders,...inlineLoaders,...preLoaders];
}else{
    loaders = [...postLoaders,...inlineLoaders,...normalLoaders,...preLoaders];
}
loaders = loaders.map(resolveLoader);

runLoaders({
    resource,//将要加载和转换的模块路径
    loaders,//使用哪些loader来进行转换 8
    context:{name:'zhangsan'},//上下文对象 一般来说没有用
    readResource:fs.readFile//你可以自定义读取文件的方法
},(err,result)=>{
    console.log(err);
    console.log(result);
    console.log(result.resourceBuffer.toString('utf8'));
});
