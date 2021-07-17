
const { getOptions,interpolateName } = require("loader-utils");
/**
 * 
 * @param {*} content 上一个loader传给当前loader的内容,或者是源文件的内容
 * content默认是字符串 先把content转换字符串给loader,
 * 如果你希望得到Buffer,不希望转成字符串传递给你
 */
function loader(content){
    let options = getOptions(this)||{};//{filename}
    //this=loaderContext filename=文件名生成模板[hash].[ext] content是文件的内容
    let filename = interpolateName(this,options.filename,{content});
    //向输出目录里输出一个文件
    //loaderRunner给的一个方法
    this.emitFile(filename,content);//  compilation.assets[filename]=content;
    //最后一个loader肯定要返回一个JS模块代码,导出一个值,这个值将会成为此模块的导出结果 
    return `module.exports=${JSON.stringify(filename)}`;
}
loader.raw =true;
module.exports = loader;