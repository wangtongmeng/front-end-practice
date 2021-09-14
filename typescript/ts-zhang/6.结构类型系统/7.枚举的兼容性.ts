// 枚举的兼容性
/* 
枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
不同枚举类型之间是不兼容的
*/

//数字可以赋给枚举
enum Colors {Red,Yellow}
let c:Colors;
c = Colors.Red;
c = 1;
c = '1';

//枚举值可以赋给数字
let n:number;
n = 1;
n = Colors.Red;

export {}