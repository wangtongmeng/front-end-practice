// 泛型约束
// 在函数中使用泛型的时候，由于预先并不知道泛型的类型，所以不能随意访问相应类型的属性或方法。


function logger<T>(val: T) {
    console.log(val.length); //直接访问会报错
}
//可以让泛型继承一个接口
interface LengthWise {
    length: number
}
//可以让泛型继承一个接口
function logger2<T extends LengthWise>(val: T) {
    console.log(val.length)
}
logger2('zhangsan');
logger2(1);


export { }