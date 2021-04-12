const fs = require('fs')  // require内部就是使用readFileSync来实现的

// let r = fs.readFileSync('./a.txt', 'utf8')
// let exits = fs.existsSync('./a.txt') // 此方法的异步方法被废弃了
// console.log(exits)


// const path = require('path') // resolve join
// console.log(path.resolve(__dirname,'a', 'b', 'c')) // 解析绝对路径, 解析默认采用 process.cwd() 如果有路径/ 会回到根目录
// console.log(path.join(__dirname, 'a', 'b', 'c'))  // 仅仅是拼接，不会产生绝对路径，遇到/ 也会拼在一起
// console.log(path.extname('a.min.js')); // .js
// console.log(path.basename('a.js','s'));  // a.j
// console.log(path.relative('a/b/c/1.js','a')); // ..\..\.. 后者相对于前者 根据路径获取相对路径
// console.log(path.dirname('a/b/c')); // a/b 取当前文件的父路径   __dirname的实现 就是path.dirname

// 字符串如何能变成js来执行？
// eval 会受执行环境影响 
// new Function “模板引擎的实现原理”  可以获取全局变量，还是会有污染的情况
// node中自己实现了一个模块 vm  不受影响 （沙箱环境）  快照（执行前记录信息，执行后还原信息）  proxy来实现

// var a = 100 //  // 拿不到a，因为是平级作用域
// global.a =100 // global上的属性是全局的，可以拿到
// new Function('b', 'console.log(a,b)')('1')

// const vm  =require('vm');
// vm.runInThisContext(`console.log(a)`); // 在node中全局变量是在多个模块下共享的, 所以不要通过global来定义属性

// 作用域
// 全局 1个上下文 global.xxx
    // function (exports,module,require,__direname,filename){ var a = 100}
    // runInThisContext (和 new Function 对比 不需要产生函数)
// runInNewContext


// 不要通过global来定义属性
// require('./a.js')
// console.log(a) // 可以取到其他模块全局定义的属性