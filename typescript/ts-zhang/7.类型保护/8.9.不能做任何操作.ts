// 不能做任何操作
/* 
不能访问属性
不能作为函数调用
不能当作类的构造函数不能创建实例
*/
let un: unknown
un.name
un();
new un();
export {}