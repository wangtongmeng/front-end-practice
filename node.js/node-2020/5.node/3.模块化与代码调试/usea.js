/**
 * 模块化与代码调试
 */
let r = require('./a')
console.log(r)

// require中可以存放 相对路径 或者绝对路径 可以省略.js .json后缀的文件

// webpack的模块化思路机制是一样的

// 1.先去读取a文件，拿到a文件中的内容 进行函数的包裹 module.exports = 'hello'
/**
 * 
 * function (exports,module,require,__dirname,__filename) {
 *  module.exports = 'hello'
 *  return module.exports
 * }(exports,module,require,__dirname,__filename)
 * 
 * 2.让函数执行 传入参数 使用vm让函数执行exports,module,require,__dirname,__filename
 */

//  如何代码调试
// https://nodejs.org/zh-cn/docs/guides/debugging-getting-started/
// 1.在chrome中调试 node --inspect-brk 文件名， 浏览器输入chrome://inspect
// 2.vscode调试 nodejs 调试源码 必须创建一个json文件 默认要取消internal_files 否则无法调试源代码 调试按钮：调到下一个断点、单步跳过(不进入方法)、进入方法中、离开方法


// 1.Module.prototype.require require方法是定义在模块原型上的
// 2.Module._load 加载模块
// 3.Module._resolveFilename 解析出绝对路径 并且添加后缀
// 4.new Module 创建一个模块 (id文件名，exports 是一个对象，存放的是模块的的导出结果)
// 5.module.load 加载模块
// 6.Module._extensions 存放着不同后缀文件的处理
// 7.读取文件 包裹函数 runInThisContext执行 传入模块属性
// 最终返回的是module.exports