// 函数柯理化 通用的柯理化函数

// 柯理化也是一个高阶函数

// ----------------
// 1.typeof （不能区分对象） 2.constructor（判断构造函数） 3.instanceof 4.Object.prototype.toString.call
// 判断元素的类型

// function isType(str, typing) {
//     return Object.prototype.toString.call(str) == `[object ${typing}]`
// }

// console.log(isType('zhangsan', 'String'))   // 容易写错 Strings
// ----------------


// ----------------
// 让方法更具体一些 isNumber isString
// function isType(typing) {
//     return function (val) {
//         return Object.prototype.toString.call(val) == `[object ${typing}]`
//     }
// }
// let utils = {};;
// ['String', 'Number', 'Boolean'].forEach(method => {
//     utils['is' + method] = isType(method)
// })

// console.log(utils.isNumber(123))
// console.log(utils.isString(132))
// ----------------


// ----------------
// 通用的柯理化函数
function sum(a, b, c, d, e) {
    return a + b + c + d + e
}
// 分批传入参数
// redux compose
const curring = (fn, arr = []) => { // arr就是我们要收集每次调用时传入的参数
    let len = fn.length // 函数的长度就是参数个数
    return function (...args) {
        let newArgs = [...arr, ...args]
        if (newArgs.length == len) {
            return fn(...newArgs)
        } else {
            return curring(fn, newArgs)
        }
    }
}
let newSum = curring(sum)
// 柯理化函数 每次的入参都是一个参数，直到总数等于形参个数，一起执行
console.log(newSum(1)(2)(3)(4)(5))
// 偏函数
console.log(newSum(1)(2)(3,4,5))

function isType(typing, val) {
    return Object.prototype.toString.call(val) == `[object ${typing}]`
}
let newIsType = curring(isType)
let isString = newIsType('String')
let isNumber = newIsType('Number')
console.log(isString('123'))
console.log(isNumber(123))
