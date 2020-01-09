// 一位数组转二维数组
function xxx (arr, len) {
    if (arr.length <= len) return [arr]
    let newArrLen = Math.ceil(arr.length / len)
    let newArr = []
    for (let i = 0; i < newArrLen; i++) {
        newArr.push(arr.slice(i * len, i * len + len))
    }
    return newArr
}

let testArr = [1,2,3,4,5,6,7,8,9,10]
let testArr1 = [1,2]
console.log(xxx(testArr, 2))
console.log(xxx(testArr, 3))
console.log(xxx(testArr1, 4))

// 二维数组转一维数组
let arr=[[1,2,3],[3,4],[5]]
console.log(arr.flat())