// 构造函数的类型
/* 
在 TypeScript 中，我们可以用 interface 来描述类
同时也可以使用interface里特殊的new()关键字来描述类的构造函数类型
*/

class Animal {
    constructor(public name: string) {
    }
}
//不加new是修饰函数的,加new是修饰类的
interface WithNameClass {
    new(name: string): Animal
}
function createAnimal(clazz: WithNameClass, name: string) {
    return new clazz(name);
}
let a = createAnimal(Animal, 'zhangsan');
console.log(a.name);
export { }