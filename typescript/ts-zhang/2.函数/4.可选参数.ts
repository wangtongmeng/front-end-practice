// 可选参数

// 在TS中函数的形参和实参必须一样，不一样就要配置可选参数,而且必须是最后一个参数

function print(name:string,age?:number):void {
    console.log(name,age);
}
print('zhangsan'); // zhangsan undefined

export {}