let loaderUtils = require('loader-utils');
/**
 * @param {*} inputSource less-loader编译后的CSS内容
 * inputSource  `module.exports = "#root{color:red}"`
 */
function loader(inputSource){
   /* let script = `
      let style = document.createElement('style');
      style.innerHTML = ${JSON.stringify(inputSource)};
      document.head.appendChild(style);
   `;
   return script; */
}
/**
 * 如果pitch函数有返回值,不需要于执行后续的loader和读文件了
 * @param {*} remainingRequest 
 * @param {*} previousRequest 
 * @param {*} data 
 * @returns 
 */
loader.pitch = function(remainingRequest,previousRequest,data){
   console.log('remainingRequest',remainingRequest);//less-loader.js!index.less
   console.log('previousRequest',previousRequest);//""
   console.log('data',data);//{}
   let script = `
      let style = document.createElement('style');
      style.innerHTML = require(${loaderUtils.stringifyRequest(this,"!!"+remainingRequest)});
      document.head.appendChild(style);
   `;
   //这个返回的JS脚本给了webpack了
   //把这个JS脚本转成AST抽象语法树,分析里的require依赖
   //
   return script;
}
module.exports = loader;
/**
 * [style-loader,less-loader]
 * request = style-loader!less-loader!index.less
 * remainingRequest=less-loader!index.less
 * !!less-loader!index.less
 * stringifyRequest 把绝对路径转成相对路径(remainingRequest C:\less-loader.js!C:\index.less => 相对于根目录的路径 类似于此模块的ID !!./loaders/less-loader.js!./src/index.less)
 * loader执行完后会把下面的代码给webpack
 *  let style = document.createElement('style');
    style.innerHTML = require("!!./loaders/less-loader.js!./src/index.less");
    document.head.appendChild(style);
    webpack会去分析依赖
    !!的前缀代表只要行内或者说是内联,不要前置后置和普通
    
 * 
 * 
 */