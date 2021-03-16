// interface 描述对象的形状和结构，可以给数据增添类型， 而且方便复用

// type的方式 通过别名来重新定义类型
// interface 可以被类实现和继承，type没有功能
// type 可以使用联合类型 interface 不能使用联合类型

// 1)如何用接口描述对象类型，如果有联合类型 就使用type
interface IObj {
  name: string;
  age: number;
}

// type IObj = {name:string,age:number} | string // 支持联合类型
const getObj = (obj: IObj) => {
  //    (obj as string).toLowerCase()
};

// 2) 描述函数类型
interface ISum {
  (a: string, b: string): string;
}
// type ISum = (a:string,b:string) => string // 这里type更直观
const sum: ISum = (a, b) => {
  return a + b;
};

// 3) 描述函数的属性 计数器的例子 每次调用函数 累加1
interface ICount {
  (): number;
  count: number;
}
const fn: ICount = (() => {
  // 函数返回函数 一般要标识函数的返回类型
  return fn.count++;
}) as ICount;
fn.count = 0;

console.log(fn());
console.log(fn());

interface IEffect {
  (): void;
  id: number;
}

function effect(fn: Function) {
  const reactiveEffect = createReactiveEffect(fn);
  return reactiveEffect;
}
function createReactiveEffect(fn: Function): IEffect {
  const effect: IEffect = function reactiveEffect() {};
  effect.id = 1;
  return effect;
}

// 4）接口的特性
// interface IVegetables {
//   color: string;
//   taste: string;
// }
// 实际属性>接口属性
// 1.直接断言，断言后可以直接使用(要保证接口中限制的数据必须要有)
// const tomato:IVegetables = {
//     color: 'red',
//     taste: 'sweet',
//     size: 'big'
// } as IVegetables

// 2.接口的合并 接口同名会合并，会改变原有的接口 比较危险
// interface IVegetables {
//     color: string;
//     taste: string;
//   }
// interface IVegetables {
//   size: string;
// }
// const tomato: IVegetables = {
//   color: "red",
//   taste: "sweet",
//   size: "big",
// };

// 3.单独写一个tomato接口，继承蔬菜接口
// interface IVegetables {
//     color: string;
//     taste: string;
//   }
// interface ITomato extends IVegetables { // 接口的继承 ts里的
//     size:string
// }
// const tomato: ITomato = {
//   color: "red",
//   taste: "sweet",
//   size: "big",
// };

// 4.可选属性 可以通过?来实现
// interface IVegetables {
//   color: string;
//   taste: string;
//   size?: string; // 函数的参数
// }

// const tomato: IVegetables = {
//   color: "red",
//   taste: "sweet",
//   size: "big",
// };
// tomato.size // 好处 会有提示

// 5.任意接口
interface IVegetables {
  color: string;
  taste: string;
  [key: string]: any; // 任意接口 可多填  key写什么都行，一般写key
}

const tomato: IVegetables = {
  color: "red",
  taste: "sweet",
  size: "big",
  a: 1,
  1: 1,
};

// 6.可索引接口
interface IlikeArray {
  [key: number]: any;
}
let arr: IlikeArray = [1, 2, 3];
let arr1: IlikeArray = { 1: 1, 2: 2 };


// 把一个对象赋值给一个接口，要满足接口中的所有属性
// 如果多出来里的属性 可以采用 断言、可选、任意接口

// 嵌套的情况
// 接口中的类型 可以通过类型别名的方式拿出来，但是只能用[]
// type MyType = {key:string,value:string}
// interface XXX {
//     n: MyType[]
// }
// interface IArr {
//     arr: MyType[],
//     a:XXX
// }

// type My = IArr['a']['n']

export {};
