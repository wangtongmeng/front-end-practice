// const getArray = (value: any, times: number = 5):any => {
//     return new Array(times).fill(value)
// }

// console.log(getArray(2)) // [2, 2, 2, 2, 2]
// console.log(getArray(2,3)) // [2, 2, 2]
// console.log(getArray(4,3).map(item => item.length))  // [undefined, undefined, undefined]
// console.log(getArray('abc',3).map(item => item.length)) // [3, 3, 3]

const getArray = <T>(value: T, times: number = 5):T[] => {
    return new Array(times).fill(value)
}

console.log(getArray<number>(123,3).map(item => item.toFixed))

// 泛型变量



