// 底部流出

// 返回类型能被 return 语句推断
function add(a: number, b: number) {
    return a + b;
}
let c = add(1,2); // c的类型推断为number
export {}