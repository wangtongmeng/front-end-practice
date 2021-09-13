
// Symbol

/* 
我们在使用 Symbol 的时候，必须添加 es6 的编译辅助库
Symbol 是在ES2015之后成为新的原始类型,它通过 Symbol 构造函数创建
Symbol 的值是唯一不变的
*/
const sym1 = Symbol('key');
const sym2 = Symbol('key');
Symbol('key') === Symbol('key') // false
export { }