// 类型推论
/* 是指编程语言中能够自动推导出值的类型的能力，它是一些强静态类型语言中出现的特性
定义时未赋值就会推论成any类型
如果定义的时候就赋值就能利用到类型推论 */

{
    let username2; // 如果是推论是any，可以被其他类型赋值
    username2 = 10;
    username2 = 'zhangsan';
    username2 = null;
}
{
    let username2 = 10; // 如果是推论是具体类型，则不能被其他类型赋值
    // username2 = 'zhangsan'; // Type 'string' is not assignable to type 'number'.ts(2322)
    // username2 = null; // Type 'null' is not assignable to type 'number'.ts(2322)  配置 "strictNullChecks": false 可以
    // username2 = undefined // Type 'undefined' is not assignable to type 'number'.ts(2322)  配置 "strictNullChecks": false 可以
}

export { }