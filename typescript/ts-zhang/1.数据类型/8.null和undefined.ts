// null 和 undefined
/* null 和 undefined 是其它类型的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined
strictNullChecks 参数用于新的严格空检查模式,在严格空检查模式下， null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any */


let x: number;
x = 1;
// x = undefined; // 设置"strictNullChecks": false
// x = null;   

let y: number | null | undefined;
y = 1;
y = undefined;   
y = null;  

export { }