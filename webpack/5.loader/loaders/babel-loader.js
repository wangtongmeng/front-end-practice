const babel = require('@babel/core');
const path = require('path');
function loader(inputSource){
    // const options = {
    //     presets:["@babel/preset-env"],
    //     sourceMaps:true,//如果这个参数不传,默认值false,不会生成sourceMap
    //     filename:path.basename(this.resourcePath)
    // }
    const { getOptions } = require("loader-utils");
    let options = getOptions(this) || {};
    options.filename=path.basename(this.resourcePath);//index.js
    //code转换后的es5代码,map转换后的代码到转换前的代码的映射 ast转换后的抽象语法树
    let {code,map,ast} = babel.transform(inputSource,options);
    //loader可以返回一个值 ,也可以返回多个值
    //返回一个值的话可以return 返回多个值的话,必须 this.callback(err,传递给下一个loader的参数)
    //callback是loader-runner提供的一个方法
    //this默认是context,默认是空对象,但是在loader-runner执行的过会给context增加很多的方法和属性
    return this.callback(null,code,map,ast);

    //在这个loader里把es6转成了es5,给了webpack
    //webpack只能实现main.js=>es5 index.js 
    //module loader转换的时候 es6=>es5,也有一个map文件
}

module.exports = loader;