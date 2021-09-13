// 包装对象（Wrapper Object） 

/* 
JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。
所有的原始数据类型都没有属性（property）
原始数据类型
布尔值
数值
字符串
null
undefined
Symbol

*/


let name = 'zhangsan';
console.log(name.toUpperCase()); // ZHANGSAN

console.log((new String('zhangsan')).toUpperCase()); // ZHANGSAN
// 当调用基本数据类型方法的时候，JavaScript 会在原始数据类型和对象类型之间做一个迅速的强制性切换
let isOK: boolean = true; // 编译通过
let isOK1: boolean = Boolean(1) // 编译通过
// let isOK2: boolean = new Boolean(1); // 编译失败    期望的 isOK 是一个原始数据类型 Type 'Boolean' is not assignable to type 'boolean'.'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.ts(2322)

export { }