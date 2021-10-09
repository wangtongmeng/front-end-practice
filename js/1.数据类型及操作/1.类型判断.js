


/* 

JS中有七种基本数据类型
六种基本数据类型 Boolean Null Undefined Number String Symbol
一种引用类型 object {} [] /^$/ new Date() Math


typeof 基本类型
instanceof 类的实例
constructor
Object.prototype.toString.call() 最强大
*/

console.log(typeof a);    // undefined
console.log(typeof 1);   // number
console.log(typeof 'lisi'); // string
console.log(typeof true);  // boolean
console.log(typeof Symbol('a'));  // symbol

console.log(typeof function () { });  //function

console.log(typeof [1, 2, 3]);  //object
console.log(typeof { name: 'lisi' });  //object
console.log(typeof null);  //object
console.log(typeof new Number(1));  //object