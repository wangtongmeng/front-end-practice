// 接口的兼容性

/* 
如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
原理是Duck-Check,就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的
*/

interface Animal {
    name: string;
    age: number;
}

interface Person {
    name: string;
    age: number;
    gender: number
}
// 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
function getName(animal: Animal): string {
    return animal.name;
}

let p = {
    name: 'zhangsan',
    age: 10,
    gender: 0
}

getName(p);
//只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
let a: Animal = {
    name: 'zhangsan',
    age: 10,
    gender: 0
}
export { }