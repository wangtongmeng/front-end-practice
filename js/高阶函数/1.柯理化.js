/* 方案1 */
// const add = (function (total) {//参数的总个数
//     let allArgs = [];
//     function _add(...args) {
//         allArgs = [...allArgs, ...args]
//         if (allArgs.length >= total) {
//             let ret = allArgs.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
//             allArgs.length = 0;
//             return ret;
//         } else {
//             return _add;
//         }
//     }
//     return _add;
// })(5);
// console.log(add(1, 2, 3, 4, 5));//15
// console.log(add(1)(2)(3)(4)(5));//15
// console.log(add(1, 2)(3, 4, 5));//15

/* 方案2 */
// function add(...args) {
//     let _add = add.bind(null, ...args);
//     _add.toString = function () {
//         return args.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
//     }
//     return _add;
// }
// // 浏览器中运行
// alert(add(1, 2, 3, 4, 5));//15
// alert(add(1)(2)(3)(4)(5));//15
// alert(add(1, 2)(3, 4, 5));//15

/* 方案3 通用currying */
function curry(fn, ...args) {//[] [1] [2] [3] [4] [5]
    //args.length=0 < fn.length=5
    return args.length < fn.length ? (...innerArgs) => curry(fn, ...args, ...innerArgs) : fn(...args);
}
//函数的length属性代表函数形参的个数
function addFn(a, b, c, d, e) {
    return a + b + c + d + e;
}
let add = curry(addFn);
console.log(add(1, 2, 3, 4, 5));//15
console.log(add(1)(2)(3)(4)(5));//15
console.log(add(1, 2)(3, 4, 5));//15