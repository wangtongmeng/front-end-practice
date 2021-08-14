// npm install typescript   ts-node  -g
// code runner


// ts 中冒号后面的都是类型
const str: string = 'hello zf';
const num: number = 12;
const boolean:boolean = true;

// 联合类型 
let age:string | number =  1;

//  数组 对象 函数
const arr: number[] = [1,2,3];

// 元组
const tuple: [string,number] = ['zf',1]
console.log(tuple);

let n:null = null;
let u:undefined = undefined;

// 枚举
enum USER_ROLE {
    USER = 'user',
    MANAHGER = 'manager',
    ADMIN = 'admin'
}
console.log(USER_ROLE.USER);

// any
const array = [{},'a',123];

// object类型  非原始数据类型
// Object.create(arr);
const create = (obj:object)=>{}
create({});
create([]);
create(function(){});

// 对象类型 {}

export {}