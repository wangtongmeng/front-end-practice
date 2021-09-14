// 可索引接口
/* 
对数组和对象进行约束
userInterface 表示index的类型是 number，那么值的类型必须是 string
UserInterface2 表示：index 的类型是 string，那么值的类型必须是 string
*/

interface UserInterface {
    [index: number]: string
}
let arr: UserInterface = ['zhangsan', 'lisi'];
console.log(arr);

interface UserInterface2 {
    [index: string]: string
}
let obj: UserInterface2 = { name: 'zhangsan' };

export { }