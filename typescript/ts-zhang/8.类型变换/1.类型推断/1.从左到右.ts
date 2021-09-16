/* 
类型推断
TypeScript 能根据一些简单的规则推断变量的类型
*/


// 从右向左 
/* 
变量的类型可以由定义推断
这是一个从右向左流动类型的示例
*/

let foo = 1; // foo 是 'number'
let bar = 'zhangsan'; // bar 是 'string'
//foo = bar; // Error: 不能将 'string' 赋值给 `number`

export {}