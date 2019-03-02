// require 是一个方法
// 它的作用是用来加载模块的
// 在 Node 中，模块有三种：
//    具名的核心模块，如 fs、http
//    用户自己编写的文件模块
//      相对路径必须加 ./ 不能省略 否则报错
//      可以省略后缀名
//    第三方模块
//    
//    在 Node 中，没有全局作用域，只有模块作用域
//      外部访问不到内部
//      内部也访问不到外部              
var foo = 'aaa'
console.log('a start');

// require('./b.js')
require('./b')

console.log('a end');

console.log('foo 的值是：', foo);

