
// BigInt
/* 
使用 BigInt 可以安全地存储和操作大整数
我们在使用 BigInt 的时候，必须添加 ESNext 的编译辅助库
要使用1n需要 "target": "ESNext"
number和 BigInt类型不一样,不兼容
*/


const max1 = Number.MAX_SAFE_INTEGER;// 2**53-1
console.log(max1 + 1 === max1 + 2); // true

const max2 = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max2 + 1n === max2 + 2n); // false


let foo: number;
let bar: bigint;
// foo =bar; // Type 'bigint' is not assignable to type 'number' 不兼容
export { }