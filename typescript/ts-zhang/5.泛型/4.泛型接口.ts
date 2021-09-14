// 泛型接口
// 泛型接口可以用来约束函数
interface Calculate {
    <T>(a: T, b: T): T
}
let add: Calculate = function <T>(a: T, b: T) {
    return a;
}
add<number>(1, 2);

// 定义接口的时候也可以指定泛型
interface Cart<T> {
    list: T[]
}
let cart: Cart<{ name: string, price: number }> = {
    list: [{ name: 'zhangsan', price: 10 }]
}
console.log(cart.list[0].name, cart.list[0].price); // zhangsan 10

export { }