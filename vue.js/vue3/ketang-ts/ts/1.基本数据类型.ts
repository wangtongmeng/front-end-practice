// npm install typescript ts-node -g
// code runner

// ts 中冒号后面的都是类型
const str: string = "hello";
const num: number = 12;
const boolean:boolean = false

// 联合类型
let age: string | number = 1

// 数组 对象 函数
const arr: number[] = [1,2,3]

// 元组
const tuple:[string,number] = ['ss', 1]


let n:null = null
let u:undefined = undefined

// 枚举
enum USER_ROLE {
    USER = 'user',
    MANAGER = 'manager',
    ADMIN = 'admin'
}
console.log(USER_ROLE.USER)

// any
const array:any = [{}, 'a',234]


// object类型 非原始数据类型
// Object.create(arr)
const create = (obj:object)=>{

}
create({})
create([])
create(function(){})