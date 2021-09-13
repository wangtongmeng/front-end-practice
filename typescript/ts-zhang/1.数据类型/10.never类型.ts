// never类型

// never是其它类型(null undefined)的子类型，代表不会出现的值


/* 作为不会返回（ return ）的函数的返回值类型 */

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function error(message: string): never {
    throw new Error(message);
}
let result1 = error('hello');
// 由类型推论得到返回值为 never
function fail() {
    return error("Something failed");
}
let result = fail();

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function infiniteLoop(): never {
    while (true) { }
}



/* strictNullChecks */
// 在 TS 中， null 和 undefined 是任何类型的有效值，所以无法正确地检测它们是否被错误地使用。于是 TS 引入了 --strictNullChecks 这一种检查模式
// 由于引入了 --strictNullChecks ，在这一模式下，null 和 undefined 能被检测到。所以 TS 需要一种新的底部类型（ bottom type ）。所以就引入了 never。
// Compiled with --strictNullChecks
function fn(x: number | string) {
    if (typeof x === 'number') {
        // x: number 类型
    } else if (typeof x === 'string') {
        // x: string 类型
    } else {
        // x: never 类型
        // --strictNullChecks 模式下，这里的代码将不会被执行，x 无法被观察
    }
}
fn(1)
fn('1')


/* never 和 void 的区别 */
// void 可以被赋值为 null 和 undefined的类型。 never 则是一个不包含值的类型。
// 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

export { }