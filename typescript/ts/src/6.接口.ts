// interface 描述对象的形状和结构，可以给数据增添类型， 而且方便复用

// type的方式 通过别名来重新定义类型
// interface 可以被类实现和继承，type没有功能
// type 可以使用联合类型 interface 不能使用联合类型


// 1)如何用接口描述对象类型，如果有联合类型 就使用type
// interface IObj {
//     name:string
//     age:number
// }

type IObj = {name:string,age:number} | string // 支持联合类型
const getObj = (obj:IObj) => {
//    (obj as string).toLowerCase()
}


export {}