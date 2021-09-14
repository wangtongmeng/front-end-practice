// 函数类型接口

// 对方法传入的参数和返回值进行约束
interface discount {
    (price: number): number
}
let cost: discount = function (price: number): number {
    return price * .8;
}
export { }