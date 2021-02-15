// 用来描述对象形状的 interface

interface ISchool {
  readonly name: string, // 只读
  age: number,
  address?: string // 可选
}

let school: ISchool = {
    name: 'xxx',
    age: 3,
    // address: '色牢度范龙飞'
}

// 接口可以扩展

interface ChildSchool extends ISchool {
    type: string
    [key:string]:any // 任意类型
}

let s:ChildSchool = {
    ...school,
    type: 'web',
    a:1,
    b:2
} 


// 类型断言 表示这个对象就是这样一个类型
let school2:ISchool = ({
    name: 'xxx',
    age: 111,
    lessons: ['xx','xxx']
}) as ISchool