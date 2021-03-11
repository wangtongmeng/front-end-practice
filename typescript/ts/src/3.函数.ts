// 函数 对函数增加类型
// 对函数的参数进行类型校验 对函数的返回值进行类型校验 对函数本身进行类型校验

// 考虑函数的参数和返回值    函数声明的类型方式 function关键字 | 表达式声明

// 函数关键字 写完后会对当前函数 自动推断类型
function sum(x:string,y:string):string { // 函数类型 function sum(x: string, y: string): string
    return x + y
}


export {}