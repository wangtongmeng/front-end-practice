
const { getOptions,interpolateName } = require("loader-utils");
const mime = require('mime');
/**
 * 
 * @param {*} content 上一个loader传给当前loader的内容,或者是源文件的内容
 * content默认是字符串 先把content转换字符串给loader,
 * 如果你希望得到Buffer,不希望转成字符串传递给你
 */
function loader(content){
    let options = getOptions(this)||{};//{filename}
    let {limit,fallback} = options;
    if(limit)
        limit = parseInt(limit,10);
    const mimeType = mime.getType(this.resourcePath);   
    if(!limit || Buffer.byteLength(content) < limit){
        let base64 = `data:${mimeType};base64,${content.toString('base64')}`;
        return `module.exports=${JSON.stringify(base64)}`
    }else{
        //require('file-loader');//会去node_modules里找 require跟webpack没关系,走的原生的node模块查找逻辑
        return require(fallback).call(this,content);
    }
}
loader.raw =true;
module.exports = loader;