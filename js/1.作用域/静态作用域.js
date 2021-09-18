// 作用域在函数声明时，就已经确定了
function two() {
    console.log(a);
}
function one() {
    var a = 2;
    two();
}
var a = 1;
one(); // 1


let globalEC = {
    a: 1,
    one() { },
    two() { }
}
let twoEC = {
    this: globalThis,
    outer: globalEC,
    variableEnvironment: { a: 1, two() { console.log(a) } } //出生的地方
}
var twoEc = { outer: globalEC };
console.log(twoEC.outer.a);