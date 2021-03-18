// 函数 对函数增加类型
// 对函数的参数进行类型校验 对函数的返回值进行类型校验 对函数本身进行类型校验

// 考虑函数的参数和返回值    函数声明的类型方式 function关键字 | 表达式声明

// 函数关键字 写完后会对当前函数 自动推断函数类型  函数重载
function sum1(x: string, y: string): string {
  // 函数类型 function sum(x: string, y: string): string
  return x + y;
}

// 表达式的方式 类型确定
// 1.也可以自动根据等号右边的内容 推断左边的类型
const num2 = (x: string, y: string): string => {
  // num2: (x: string, y: string) => string
  return x + y;
};
// 2.也可以指定类型 赋予一个可以兼容这个类型的函数
type IFn = (a: number, b: number) => number;
const num3: IFn = (x: number, y: number) => {
  return x + y;
};

// 3.函数会自动调到返回值类型

// 3种方式都有使用

// js里的方法全部支持

// 可选参数 ? 但是y的类型可以是number | undefined
// 默认值 =号
// 可以使用剩余运算符
// js中默认值和可选参数不能一起使用
const num4 = (x: number, y?: number, ...args: number[]): number => {
  // return x + y!
  return x + (y as number);
};

num4(1, 2, 4, 124, 5);

// 函数重载 一个方法根据参数的不同实现不同的功能，ts的目的就是根据不同的参数返回类型
// 重载方法放在真实方法上面

// 123 => [1,2,3]
// 'abc' => [a,b,c]

function toArray(value:string):string[]
function toArray(value:number):number[]
function toArray(value: number | string) {
  if (typeof value === "string") {
    return value.split("");
  } else {
    return value
      .toString()
      .split("")
      .map((item) => Number(item));
  }
}
let r = toArray('123')

// ts 1.为了安全 2.为了有提示

export {};
