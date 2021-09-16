// 从左向右
// 函数参数类型/返回值类型也能通过赋值来推断
type Sum = (a: number, b: number) => number;
let sum: Sum = (a, b) => {
    // a='zhangsan'; // a 推断为number
    return a + b;
};
export {}