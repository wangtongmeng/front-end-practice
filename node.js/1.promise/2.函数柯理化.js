// “函数柯里化”  多个参数的传入 把他转化成 n个函数   可以暂存变量
// 一般柯里化参数要求 都是一个个的传  => 偏函数
// 柯里化： 让函数变得更具体一些，反柯里化： 让函数范围变的更大一些

// 实现通用的柯里化函数： 高阶函数
function curring(fn) {
  const inner = (args = []) => { // 存储每次调用时传入的参数
    return args.length >= fn.length? fn(...args): (...userArgs) => inner([...args, ...userArgs]) // 递归返回函数
  }
  return inner()
}

// function sum(a,b,c,d) {
//   return a+b+c+d
// }
// let sum1 = curring(sum)
// let sum2 = sum1(1)
// let sum3 = sum2(2,3)
// let result = sum3(4)
// console.log(result) // 10


// 判断一个变量的类型  （代码的实现 类型是基本条件）
// typeof 我们一般用于判断基础类型
// instanceof xxx是谁的实例 原理
// Object.prototype.toString.call  判断具体类型 返回的是一个字符串
// coustructor 深拷贝会用到

// function isString(typing) {
//   return function (val) {
//     return Object.prototype.toString.call(val) == `[object ${typing}]`
//   }
// }
// function isNumber(typing) {
//   return function (val) {
//     return Object.prototype.toString.call(val) == `[object ${typing}]`
//   }
// }
// let myIsString = isString('String')
// console.log(myIsString(123)) // false
// console.log(myIsString('123')) // true

function isType(typing,val) {
  return Object.prototype.toString.call(val) == `[object ${typing}]`
}
let util = {}
let arr = ['String','Number','Boolean','Null','Undefined']
arr.forEach(type => {
  util['is'+type] = curring(isType)(type)
});


console.log(util.isString(123)) // false
console.log(util.isNumber(123)) // true


// 应用场景
// 请求数据 多个接口等待数据返回后 再去渲染页面
// 类型判断