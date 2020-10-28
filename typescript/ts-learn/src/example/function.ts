// 函数类型

// function add(arg1: number, arg2: number): number {
//     return arg1 + arg2
// }
// const add1 = (arg1: number, arg2: number) => arg1 + arg2

// 完整的函数类型

let add: (x: number, y: number) => number;
add = (arg1: number, arg2:number):number => arg1 +arg2
add = (arg1: number, arg2:number) => arg1 +arg2

// let arg3 = 3
// add = (arg1: number, arg2:number) => arg1 +arg2 + arg3 // 如果变量在函数体外，是不需要定义变量类型的


// 使用接口定义函数类型
// interface Add {
//     (x: number, y: number): number
// }

// 使用类型别名
type Add = (x: number, y: number) => number
// let addFunc: Add
// addFunc = (arg1: number, arg2:number) => arg1 +arg2

// 可选参数

let addFunc
addFunc = (arg1, arg2, arg3) => arg1 + arg2 + (arg3 ? arg3: 0)
// 在ts中，可选参数需要在必选参数后面
type AddFunction = (arg1: number, arg2: number, arg3?: number) => number
let addFunction: AddFunction
addFunction = (x: number, y: number) => x + y
addFunction = (x: number, y: number, z: number) => x + y + z

// 默认参数

// es5
// var addFunctions = function (x, y) {
//     y = y || 0
//     return x + y
// }
// addFunctions(1) // 1
// addFunctions(1, 2) // 3

// es6
// let add2 = (x, y = 3) => x + y

// ts
// let add3 = (x: number, y: number = 3) => x + y
// // ts会根据默认值判断出参数类型
// let add4 = (x: number, y = 3) => x + y
// console.log(add4(1)) // 4
// console.log(add4(1, 2)) // 3

// 剩余参数
// 参数个数不一定的

// es5 使用 arguments
// function handleData () {
//     if (arguments.length === 1) return arguments[0] * 2
//     else if (arguments.length === 2) return arguments[0] + arguments[1]
//     else return Array.prototype.slice.apply(arguments).join('_')
// }
// handleData(1) // 2
// handleData(1, 2) // 3
// handleData(1, 2, 3, 4) // 10

// es6 ...操作符
// const handleData = (...args) => {
//     console.log(args)
// }
// handleData(1) // [1]
// handleData(1,2) // [1,2]
// handleData(1,2,3,4) // [1,2,3,4]

// ...拆解运算福
// let arr1 = [1,2,3]
// let arr2 = [...arr1]
// let arr3 = [4]
// arr3.push(arr1)

// let obj1 = {
//     a: 'a',
//     b: 'b'
// }
// let obj2 = {
//     ...obj1,
//     c: 'c'
// }

// ts
// const handleData = (arg1: number, ...args: number[]) => {
//     // ...
// }

// 重载 只能使用function 来定义
// function handleData(x: string):string[]
// function handleData(x:number):number[]
// function handleData(x:any):any {
//     if (typeof x === 'string') {
//         return x.split('')
//     } else {
//         return x.toString().split('').map(item => Number(item))
//     }
// }
// console.log(handleData('abc')) // ['a', 'b', 'c']
// console.log(handleData(123)) // [1,2,3]
