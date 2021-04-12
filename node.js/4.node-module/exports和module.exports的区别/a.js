// 内部会将module.exports 直接导出

console.log(module.exports === exports, this === module.exports) // this指代的是当前模块的导出对象
module.exports = 'hello' // 优先级是最高的(如果存在其他导出方式)，因为最终会将module.exports 直接导出
exports.a = 'hello'
this.b = 'world'


// function () {
//     let exports = module.exports = {}
//     exports = 'hello'
//     return module.exports
// }
// exports = 'hello' // 错误的写法 

// exports 就是 modole.exports 一个别名，起到了简化的作用
// 如果有多个方法要一个个导出，可以采用exports

exports.fn1 = function () {
    
}
exports.fn2 = function () {
    
}
// 或
module.exports = {
    fn1(){},
    fn2(){}
}


// 如果导出的是一个函数或对象，直接用module.exports
module.exports = function () {
    
}


global.a = 100 // 这种方式不建议使用，除非是非常重要的，懒得导入，可以使用在global上赋值

