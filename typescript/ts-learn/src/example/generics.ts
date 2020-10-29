// const getArray = (value: any, times: number = 5):any => {
//     return new Array(times).fill(value)
// }

// console.log(getArray(2)) // [2, 2, 2, 2, 2]
// console.log(getArray(2,3)) // [2, 2, 2]
// console.log(getArray(4,3).map(item => item.length))  // [undefined, undefined, undefined]
// console.log(getArray('abc',3).map(item => item.length)) // [3, 3, 3]

// const getArray = <T>(value: T, times: number = 5):T[] => {
//     return new Array(times).fill(value)
// }

// console.log(getArray<number>(123,3).map(item => item.toFixed))

// 泛型变量

// 返回类型是元组构成的数组
// const getArray = <T, U>(param1: T, param2: U, times: number):[T, U][] => {
//     return new Array(times).fill([param1, param2])
// }

// getArray<number, string>(1, 'a', 3).forEach(item => {
//     console.log(item[0])
//     console.log(item[1])
// })

// 泛型在类型定义中的使用

// 使用泛型定义泛型函数类型
// let getArray: <T>(arg: T, times: number) => T[]
// getArray = (arg: any, times: number) => {
//     return new Array(times).fill(arg)
// }
// 使用别名定义函数类型
// type GetArray = <T>(arg: T, times: number) => T[]
// let getArray: GetArray = (arg: any, times: number) => {
//     return new Array(times).fill(arg)
// }
// 使用接口定义函数类型
// interface GetArray {
//     <T>(arg: T, times: number): T[]
// }
// 也可以把泛型变量提升，提升的最外层，内部所有地方都可以使用
// interface GetArray<T> {
//     (arg: T, times: number): T[],
//     array: T[]
// }

// 泛型约束 对泛型变量的条件限制

interface ValueWithLength {
    length: number
}
const getArray = <T extends ValueWithLength>(arg: T, times): T[] => {
    return new Array(times).fill(arg)
}
getArray([1,2], 3)
getArray('123', 3)
getArray({
    length: 2
}, 3)
// getArray(123, 3) // Argument of type 'number' is not assignable to parameter of type 'ValueWithLength'.
// 只传带length属性的

// 在泛型约束中使用类型参数

// keyof 是索引类型, 返回对象的所有属性名构成的数组
const getProps = <T, K extends keyof T>(object: T, propName: K) => {
    return object[propName]
}

const objs = {
    a: 'a',
    b: 'b'
}
getProps(objs, 'a')
// getProps(objs, 'c') // Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.