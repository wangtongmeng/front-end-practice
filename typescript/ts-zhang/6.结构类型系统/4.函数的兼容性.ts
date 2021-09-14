// 函数的兼容性
// 比较函数的时候是要先比较函数的参数，再比较函数的返回值


/* 比较参数 */
type sumFunc = (a: number, b: number) => number;
let sum: sumFunc;
function f1(a: number, b: number): number {
    return a + b;
}
sum = f1;

//可以省略一个参数
function f2(a: number): number {
    return a;
}
sum = f2;

//可以省略二个参数
function f3(): number {
    return 0;
}
sum = f3;

//多一个参数可不行
function f4(a: number, b: number, c: number) {
    return a + b + c;
}
sum = f4; // 类似函数传参，多了没法处理


/* 比较返回值 */

type GetPerson = ()=>{name:string,age:number};
let getPerson:GetPerson;
//返回值一样可以
function g1(){
    return {name:'zhangsan',age:10};
}
getPerson = g1;
//返回值多一个属性也可以
function g2(){
    return {name:'zhangsan',age:10,gender:'male'};
}
getPerson = g2;
//返回值少一个属性可不行
function g3(){
    return {name:'zhangsan'};
}
getPerson = g3;
//因为有可能要调用返回值上的方法
getPerson().age.toFixed();
export { }