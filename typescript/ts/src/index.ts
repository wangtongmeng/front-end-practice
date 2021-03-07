// https://www.tslang.cn/docs/home.html
// 1.基础类型
// 最基本的类型 数字 字符串 布尔
// 所有类型都在冒号的后面，ts的核心一切都已安全为准
// 什么时候可以不用类型，推导
// number和Number的区别 js特性 装箱的概念 xxx.xxx
let num1: number = 1;
let num2: Number = 1; // 用来描述实例的 类也可以当做类型 这里1也是Number的实例
let num3: number = Number(1);
let num4: Number = new Number(1);
let str1:String = new String('tm')


// 最基本
let num: number = 1;
let str: string = "tm";
let bool: boolean = true;

// 数组类型 数组的概念：一类类型的集合
const arr:number[] = [] // number组成的数组
const arr2:(number | string)[] = ['a', 1] // | 并集的含义
const arr3:any[] = ['', 1,{}] // 数组里放任何类型，不能类型推断，都是any了
const arr4:Array<boolean> = [true,false] // 另一种定义数组的方式，泛型的方式


// 元组 ts中自己实现的 内容固定 类型固定
const tuple:[string,boolean,number] = ['a', true, 1] // 初始化 必须按照要求填入数据
// 操作元组
let r = tuple.pop() // pop的有可能是这四种类型 let r: string | number | boolean | undefined
tuple.push('str') // 在放入时 可以放入元组中定义的类型
tuple[2] = 100
// tuple[3] = 100 // 利用索引不能超出长度 Type '100' is not assignable to type 'undefined'.ts(2322)

// 数据交换 会用到元素 结合泛型