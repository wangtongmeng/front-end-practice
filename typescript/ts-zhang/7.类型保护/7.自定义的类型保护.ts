// 自定义的类型保护
/* 
TypeScript 里的类型保护本质上就是一些表达式，它们会在运行时检查类型信息，以确保在某个作用域里的类型是符合预期的
type is Type1Class就是类型谓词
谓词为 parameterName is Type这种形式,parameterName必须是来自于当前函数签名里的一个参数名
每当使用一些变量调用isType1时，如果原始类型兼容，TypeScript会将该变量缩小到该特定类型
*/

function isType1(type: Type1Class | Type2Class): type is Type1Class {
    return (<Type1Class>type).func1 !== undefined;
}

interface Bird {
    swing: number;
}

interface Dog {
    leg: number;
}

//没有相同字段可以定义一个类型保护函数
function isBird(x: Bird | Dog): x is Bird {
    return (<Bird>x).swing == 2;
    //return (x as Bird).swing == 2;
}

function getAnimal(x: Bird | Dog) {
    if (isBird(x)) {
        return x.swing;
    }
    return x.leg;
}

export { }