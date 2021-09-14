// any 类型

/*
在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的 顶级类型 (也被称作 全局超级类型)。
TypeScript允许我们对 any 类型的值执行任何操作，而无需事先执行任何形式的检查
*/


let value: any;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = Math.random;      // OK
value = null;             // OK
value = undefined;        // OK


{
    let value: any;
    value.foo.bar;  // OK
    value.trim();   // OK
    value();        // OK
    new value();    // OK
}
export { }