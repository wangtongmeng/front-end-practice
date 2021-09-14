// 缩小 unknown 类型范围
/* 
如果没有类型断言或类型细化时，不能在unknown上面进行任何操作
typeof
instanceof
自定义类型保护函数
可以对 unknown 类型使用类型断言
*/


const value: unknown = "Hello World";
const someString: string = value as string;

export {}