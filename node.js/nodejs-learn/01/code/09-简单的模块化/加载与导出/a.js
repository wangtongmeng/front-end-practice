// require 方法有两个作用：
//    1.加载模块并执行里面的代码
//    2.拿到被加载模块导出的接口对象

//    在每个文件模块中都提供了一个对象：exports
//    exports 默认是一个空对象
//    你要做的就是把所需要被外部访问的成员挂载到这个 exports 对象中


let bExports = require('./b')
let fs = require('fs')

console.log(bExports.foo, bExports.add(1,2));

bExports.readFile('./a')

fs.readFile('./a.js', function (err, data) {
  if (err) {
    console.log('读取文件失败');
    
  } else {
    console.log(data.toString());
    
  }
})

