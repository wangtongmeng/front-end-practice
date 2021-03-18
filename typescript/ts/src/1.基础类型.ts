// https://www.tslang.cn/docs/home.html
// 1.基础类型
// 最基本的类型 数字 字符串 布尔
// 数字 字符串 布尔 数组 元组 any never void null undefined 枚举 11种
// 所有类型都在冒号的后面，ts的核心一切都已安全为准
// 什么时候可以不用类型，推导
// number和Number的区别 js特性 装箱的概念 xxx.xxx
let num1: number = 1;
let num2: Number = 1; // 用来描述实例的 类也可以当做类型 这里1也是Number的实例
let num3: number = Number(1);
let num4: Number = new Number(1);
let str1: String = new String("tm");

// 最基本
let num: number = 1;
let str: string = "tm";
let bool: boolean = true;

// 数组类型 数组的概念：一类类型的集合
const arr: number[] = []; // number组成的数组
const arr2: (number | string)[] = ["a", 1]; // | 并集的含义
const arr3: any[] = ["", 1, {}]; // 数组里放任何类型，不能类型推断，都是any了
const arr4: Array<boolean> = [true, false]; // 另一种定义数组的方式，泛型的方式

// interface Array<T>{
//     [key:number]:T
// }


// 元组 ts中自己实现的 内容固定 类型固定
const tuple: [string, boolean, number] = ["a", true, 1]; // 初始化 必须按照要求填入数据
// 操作元组
let r = tuple.pop(); // pop的有可能是这四种类型 let r: string | number | boolean | undefined
tuple.push("str"); // 在放入时 可以放入元组中定义的类型
tuple[2] = 100;
// tuple[3] = 100 // 利用索引不能超出长度 Type '100' is not assignable to type 'undefined'.ts(2322)

// 数据交换 会用到元素 结合泛型

// 枚举类型 ts最终编译成js 是没有类型的，只是在开发时使用 一般大写(规范)
// 普通枚举 异构枚举 常量枚举
// 枚举支持反举，但仅限于索引，会根据上一个的值自动判断

// 普通枚举
// enum ROLE {
//     USER, // 默认值为0
//     ADMIN,
//     MANAGER
// }
// console.log(ROLE.USER) // 0
// console.log(ROLE[0]) // USER 支持反举(使用较少)

// 异构枚举
// enum ROLE {
//     USER = 'USER',
//     ADMIN = 5,
//     MANAGER
// }

// 常量枚举  加上const后 不会生成一个对象，也不支持反举(更简洁)
const enum ROLE {
  USER = "USER",
  ADMIN = 5,
  MANAGER,
}

console.log(ROLE.USER);

// null undefined  "是任何类型的子类型"
// 在严格模式下 undefined只能赋给undefined null只能赋给null

// let name:number = undefined // "strictNullChecks": false,
let u: undefined = undefined;
let n: null = null;

// never 从不 代码无法达到终点，无法执行到结尾  "是任何类型的子类型"
// 出错、死循环、永远走不到的判断，3种情况，两种是自己标的，一种是走不到的逻辑

// 永远走不到的判断
function setVal(val: string) {
  if (typeof val === "string") {
  } else {
    val; // 帮我们代码做完整校验 走不到else中 val就是never
  }
}

// 出错
function throwError(): never {  
  throw new Error();
}

// let xx: string = throwError();

// 死循环
function whileTrue(): never {
  while (true) {}
}

// void  表示函数的返回值 也可以描述变量 void的值只能赋予null和undefined
// 严格模式下 不能把null 赋予给void类型("strictNullChecks": false)

function getVoid(): void {
  // return undefined
}

// object
// 后面泛型约束 会大量使用object类型
function create(obj:object) {
    
}
create({})
create(function(){})
create([])

// Symbol BigInt js的类型 用的不多
let s1:symbol = Symbol(1)
let s2:symbol = Symbol(2)
console.log(s1 === s2) // false es6语法无法编译成es5

let max = Number.MAX_SAFE_INTEGER
let r1:bigint = BigInt(max)
console.log(max+1 === max+2) // true
console.log(BigInt(max)+BigInt(1) === BigInt(max)+BigInt(2)) // false

export {}; // 防止模块间的数据共享类型
