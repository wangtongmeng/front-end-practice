// 内置条件类型
/* 
TS 在内置了一些常用的条件类型，可以在 lib.es5.d.ts 中查看：
utility-types


lib.es5.d.ts: https://github.com/Microsoft/TypeScript/blob/c48662c891ce810f5627a0f6a8594049cccceeb5/lib/lib.es5.d.ts#L1291
utility-types: https://www.typescriptlang.org/docs/handbook/utility-types.html
*/


/* 
1.Exclude
从 T 可分配给的类型中排除 U
*/
namespace a {
    type Exclude<T, U> = T extends U ? never : T;
    type E = Exclude<string | number, string>;
    let e: E = 10; // 类型是 number
}
/* 
2.Extract
从 T 可分配的类型中提取 U
 */
namespace b {
    type Extract<T, U> = T extends U ? T : never;
    type E = Extract<string | number, string>;
    let e: E = '1'; // 类型是stirng
}
/* 
3.NonNullable
从 T 中排除 null 和 undefined
*/
namespace c {
    type NonNullable<T> = T extends null | undefined ? never : T;
    type E = NonNullable<string | number | null | undefined>;
    let e: E = '';
    e = 1 // string | number
}

/* 
4.ReturnType
infer最早出现在此 PR 中，表示在 extends 条件语句中待推断的类型变量
获取函数类型的返回类型

infer: https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-inference-in-conditional-types
PR: https://github.com/Microsoft/TypeScript/pull/21496

*/
namespace d {
    type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
    function getUserInfo() {
        return { name: "lisi", age: 10 };
    }

    // 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo
    type UserInfo = ReturnType<typeof getUserInfo>;

    const userA: UserInfo = {
        name: "lisi",
        age: 10
    };
}


/* 
5.Parameters
Constructs a tuple type of the types of the parameters of a function type T
Parameters: https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterst

*/

namespace e {
    type Parameters<T> = T extends (...args: infer R) => any ? R : any;
    type T0 = Parameters<() => string>;  // []
    type T1 = Parameters<(s: string) => void>;  // [string]
    type T2 = Parameters<(<T>(arg: T) => T)>;  // [unknown]
}


/* 
6.InstanceType
获取构造函数类型的实例类型
InstanceType: https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypet
*/


type Constructor = new (...args: any[]) => any;
type ConstructorParameters<T extends Constructor> = T extends new (...args: infer P) => any ? P : never;
type InstanceType<T extends Constructor> = T extends new (...args: any[]) => infer R ? R : any;

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    getName() { console.log(this.name) }
}
//构造函数参数
type constructorParameters = ConstructorParameters<typeof Person>;
let params: constructorParameters = ['lisi']
//实例类型
type Instance = InstanceType<typeof Person>;
let instance: Instance = { name: 'lisi', getName() { } };



/* 
7.infer+分布式
distributive-conditional-types
「Distributive conditional types」主要用于拆分 extends 左边部分的联合类型
「Distributive conditional types」是由「naked type parameter」构成的条件类型。而「naked type parameter」表示没有被 Wrapped 的类型（如：Array、[T]、Promise 等都是不是「naked type parameter」）。「Distributive conditional types」主要用于拆分 extends 左边部分的联合类型，举个例子：在条件类型 T extends U ? X : Y 中，当 T 是 A | B 时，会拆分成 A extends U ? X : Y | B extends U ? X : Y；
利用在逆变位置上，同一类型变量的多个候选类型将会被推断为交叉类型的特性
*/

// tuple转union
type ElementOf<T> = T extends Array<infer E> ? E : never;

type TTuple = [string, number];

type ToUnion = ElementOf<TTuple>; // string | number


//联合类型（Union Types）表示取值可以为多种类型中的一种
//交叉类型（Intersection Types）表示将多个类型合并为一个类型
//联合类型转交叉类型
//union 转 intersection
//union 转 intersection 的操作多用于 mixin 中
//https://github.com/Microsoft/TypeScript/issues/27907
type T1 = { name: string };
type T2 = { age: number };

type UnionToIntersection<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never;
type T3 = UnionToIntersection<{ a: (x: T1) => void; b: (x: T2) => void }>; // T1 & T2
export { }