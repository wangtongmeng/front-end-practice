// Symbol 基本数据类型(基本数据类型：string number boolean undefined null symbol bigint)
// Symbol 独一无二的的类型 声明一个Symbol 声明一个带表示的Symbol
// 用Symbol做对象的属性
// 如何遍历对象的Symbol属性 Symbol属性默认是不能枚举

// let s1 = Symbol()
// let s2 = Symbol()
// console.log(s1 === s2) // false

// let s1 = Symbol('tm')
// let s2 = Symbol('tm')
// console.log(s1 === s2) // false

// let s1 = Symbol('tm')
// let obj = {
//     name: 'tm',
//     [s1]: 'ok'
// }
// console.log(obj) // { name: 'tm', [Symbol(tm)]: 'ok' }
// console.log(obj[s1]) // ok

