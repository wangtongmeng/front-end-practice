// 泛型
// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
// 泛型T作用域只限于函数内部使用

// 泛型函数 
// 首先，我们来实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值

function createArray(length: number, value: any): Array<any> {
    let result: any = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
let result = createArray(3, 'x');
console.log(result); // [ 'x', 'x', 'x' ]

// 使用了泛型
namespace a {
    function createArray2<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    let result = createArray2<string>(3, 'x');
    console.log(result); // [ 'x', 'x', 'x' ]
    
}
export { }