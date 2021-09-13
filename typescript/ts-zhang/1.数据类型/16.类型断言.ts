// 类型断言
/* 类型断言可以将一个联合类型的变量，指定为一个更加具体的类型
不能将联合类型断言为不存在的类型 */
let name: string | number;

// console.log((name as string).length);
// console.log((name as number).toFixed(2));
// console.log((name as boolean));


// 双重断言
interface Person {
    name: string;
    age: number;
}
const person = 'zhangsan' as any as Person; // ok

export {}