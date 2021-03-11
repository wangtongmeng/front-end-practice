// 联合类型 如果不进行初始化操作 必须给类型 否则都是any
let xxx; // any
let numOrStr: string | number;
// 默认联合类型 在没有确认类型前 只能调用类型公共的方法
// 在变量确认类型后 可以设置对应的方法
// numOrStr.
// numOrStr = 1
// numOrStr.
// numOrStr = 's'
// numOrStr.

// 如果赋值类型后，可以根据上下文自动推断对应类型的方法

// 场景？ 在取值时也会遇到联合类型
// numOrStr.
const ele: HTMLElement | null = document.getElementById("app"); // const ele: HTMLElement | null

// if (ele) {
//     ele.innerHTML = 'abc'
// }
// ele && (ele.innerHTML = 'abc')
// !非空断言 表示这个东西一定有值，告诉ts 按照我的想法来，如果后续出错我负责 ts特有
ele!.innerHTML = "abc";
// as / <> 直接强转某个类型(强转要求必须联合类型中有才行)
let a: string | number | undefined;
// 会被识别成jsx语法 <div class={}> <string>a 和jsx冲突 不建议使用
// (<string>a).indexOf('a') // 强转后，方便提示
// 强转的另一种写法
// (a as string).indexOf('a') // 不会和jsx冲突
// 双重断言 先转化成any 再转化成一个具体的类型，问题是会导致类型出问题
(a as any) as boolean;

// ? 号 等价于 a && a.xx && a.xx.xxx 链判断运算符 ?是js中就存在的
// let a =1
// a?.a // undefined
// a?.a?.a // undefined a.a没值，直接返回undefined

// || && | & ??

false ?? true; // ?? 表示排除 null和undefined，如果是null和undefined则返回??后面的

// 字面量类型 类型的内容是固定的 枚举
let type: "a" | "b" | "c" | "d" = "b";
// 如果类型过于负责，希望复用，可以把类型单独提取出来
type IType = "a" | "b" | "c" | "d" // 类型别名
let type1: IType = 'a'
let type2: IType = 'b'


export {};
