// 联合类型
/* 联合类型（Union Types）表示取值可以为多种类型中的一种
未赋值时联合类型上只能访问两个类型共有的属性和方法 */

let name: string | number;
name = 3;
console.log(name.toFixed(2));
name = 'zhangsan';
console.log(name.length);

export {}