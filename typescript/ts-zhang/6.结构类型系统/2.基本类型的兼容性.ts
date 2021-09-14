// 基本类型的兼容性
//基本数据类型也有兼容性判断
let num: string | number;
let str: string = 'zhangsan';
num = str;

//只要有toString()方法就可以赋给字符串变量
let num2: {
    toString(): string
}

let str2: string = 'lisi';
num2 = str2;
export { }