// 用来描述对象形状的 interface

interface ISchool  {
    readonly name:string,
    age:number,
    address?:string
}
let school:ISchool = {
    name:'zf',
    age:11,
    address:'回龙观东大街',
    
}
// 接口可以扩展 
interface IZhufeng extends ISchool {
    type:string
    [xxx:string]:any // 任意类型
}
let zhufeng :IZhufeng = {
    ...school,
    type:'web',
    a:1,
    b:2
}
//  类型断言 表示这个对象就是这样一个类型
let school2:ISchool = ({
    name:'zf',
    age:11,
    address:'回龙观东大街',
    lessons:['架构课','基础课']
}) as ISchool
