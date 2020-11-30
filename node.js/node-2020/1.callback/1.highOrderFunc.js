// 高阶函数 “2个特点满足一个就是高阶函数” 1）我们给一个函数传入一个函数  回调2）一个函数返回一个函数

// 装饰器模式（对原本的功能进行包装）切片编程

function core() {
    console.log('core...')
}
// 每个类都有一个原型，所有实例都有一个属性__proto__
Function.prototype.before = function (beforeFn) {
    // this = core
    return (...args) => { // 箭头函数中没有this 没有arguments 没有prototype 剩余运算符
        beforeFn()
        this(...args) // 扩展运算符
    }
}
let newFn = core.before(() => {
    console.log('core before')
})

newFn(1, 2, 3)

// 闭包 1）定义函数的作用域 和调用的作用域不是同一个