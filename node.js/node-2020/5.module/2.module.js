/**
 * node中的核心模块
 */

//  模块规范有哪些？ 为什么会有这些规范
// 在没有模块规范之前，开发时会有命名冲突的问题 命名空间放置冲突（调用时不方便）
// IIFE自执行的方式实现模块化 请求的处理 (seajs CMD淘汰掉了) requirejs AMD

// es6Module commonjs规范 umd统一模块(amd+es6Module) amd模块
// import export 浏览器es6
// require module.exports node使用的(如果想在node中使用es6Module 需要babel编译)

// commonjs规范定义
// 每一个文件都是一个模块
// 要通过module.exports 导出需要给别人使用的结果
// 导入需要的模块

// node中的模块分为3类 1) 核心模块(fs 内置内置) 2) require() 文件模块 自定义模块 3) 第三方模块(需要安装)

// 1) 核心模块很多 fs path vm require内部是同步的
// const fs = require('fs') // 一般有两种方法 同步，异步的
// const result = fs.readFileSync('./note.md', 'utf8')
// console.log(result) // 内容
// const bool = fs.existsSync('./note.md')
// console.log(bool) // true

// const path = require('path') // 处理路径的
// // 默认解析的路径是以process.cwd() chdir去更改   path.resolve('note.md')
// // __dirname 文件所在目录 不能更改的
// console.log(path.resolve(__dirname, 'note.md')) // 输入相对路径 返回绝对路径 有拼接的功能
// console.log(path.join(__dirname, 'note.md')) // 只是简单的拼接
// // 如果遇到带/的路径 resolve 会认为是根路径 join则是拼接在一起
// console.log(path.resolve(__dirname, 'note.md', '/'))
// console.log(path.join(__dirname, 'note.md', '/'))


// console.log(path.extname('a.min.js')) // .js 取后缀名
// console.log(path.relative('a', 'a/a.js')) // a.js 去掉相同的部分
// console.log(path.dirname(__dirname)) // __dirname = path.dirname

const vm = require('vm')
let a = 1
const log = `console.log(a)` // eval执行时会查找上下文
// eval(log)

// let fn = new Function(log) // new Function 也是产生一个执行环境 不依赖于外层作用域，必须包一层函数 模板引擎中会使用 new Function+with
// fn()

vm.runInNewContext(log) // 让字符串直接执行 并且在沙箱环境中


// 为了实现commonjs规范
