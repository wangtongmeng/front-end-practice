/* 布尔类型 */
// let bool:boolean = false

import { WatchDirectoryFlags } from "typescript";

let bool: boolean;
bool = true;
/* 数值类型 */
let num: number = 123;
num = 0b1111011;
num = 0o173;
num = 0x7b;
/* 字符串类型 */
let str: string;
str = "abc";
str = `数值是${num}`;
/* 数组类型 */
let arr: number[];
arr = [5, 6, 7];

let arr2: Array<number>;

let arr3: (string | number)[];
let arr4: Array<string | number>;
arr3 = [1, "a"];
arr4 = [1, "a"];
/* 元组类型 */
let tuple: [string, number, boolean];
tuple = ["a", 1, false];
// tuple = ["a", 1, false, 12];
/* 枚举类型 */
// enum Roles {
//     SUPER_ADMIN,
//     ADMIN,
//     USER
// }

// enum Roles {
//     SUPER_ADMIN =1,
//     ADMIN = 3,
//     USER = 8
// }

// enum Roles {
//     SUPER_ADMIN =1,
//     ADMIN,
//     USER
// }

enum Roles {
  SUPER_ADMIN,
  ADMIN = 5,
  USER,
}
console.log(Roles.SUPER_ADMIN);
console.log(Roles.ADMIN);
console.log(Roles.USER);

console.log(Roles[5], Roles[0]);

/* any类型 */
let value: any;
value = "abc";
value = 123;
value = false;
const arr5: any[] = [1, "a"];
/* void类型 */
const consoleText = (text: string): void => {
  console.log(text);
};
consoleText("abc");
let v: void;
v = undefined;
v = null;
console.log(v);
/* null和undefined */
let u: undefined;
u = undefined;
let n: null;
num = undefined;
num = null;
/* never类型 */
// const errorFunc = (message: string): never => {
//   throw new Error(message);
// };
// errorFunc("abc");
// const infiniteFunc = (): never => {
//   while (true) {console.log(1)}
// }
// infiniteFunc()
/* object类型 */
let obj = {
    name: 'zhangsan'
}
function getObject(obj: object): void {
    console.log(obj)
}
getObject(obj)
/* 类型断言 */
const getLength = (target: string | number):number => {
    if ((<string>target).length || (target as string).length === 0) {
        return (target as string).length
    } else {
        return target.toString().length
    }
}

console.log(getLength(123))
console.log(getLength('123'))