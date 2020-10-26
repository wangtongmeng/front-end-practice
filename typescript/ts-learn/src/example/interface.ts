// const getFullName = ({ firstName, lastName }) => {
//     return `${firstName} ${lastName}`
// }
// console.log(getFullName({
//     firstName: 'zhang',
//     lastName: 18
// }))
interface NameInfo {
    firstName: string,
    lastName: string
}
// const getFullName = ({ firstName, lastName }: { firstName: string, lastName: string }): string => {
const getFullName = ({ firstName, lastName }: NameInfo): string => {
    return `${firstName} ${lastName}`
}
getFullName({
    firstName: 'haha',
    // lastName: 18 // Type 'number' is not assignable to type 'string'.
    lastName: 'li'
})

// 可选属性
// interface Vegetables {
//     color?:string, // 可选属性
//     readonly type: string,
//     // [prop: string]: any // 索引签名，可以传任意多，只要保证该有的有就行了
// }
// const getVegetables = ({color, type}: Vegetables) => {
//     return `A ${color ? (color + ' ') : ''}${type}`
// }
// console.log(getVegetables({
//     color: 'red',
//     type: 'tomato'
// })) // A red tomato

// console.log(getVegetables({
//     type: 'tomato'
// })) // A tomato

// 绕过多余属性检查的三种方式
// 方式1 类型断言
// console.log(getVegetables({
//     color: 'red',
//     type: 'tomato',
//     size: 2
// } as Vegetables)) // A red tomato
// 方式2 索引签名
// console.log(getVegetables({
//     color: 'red',
//     type: 'tomato',
//     size: 2
// })) // A red tomato
// 方式3 利用类型兼容性
// const vegetableInfo = { // 后面的属性必须包含前面的
//     type: 'tomato',
//     color: 'red',
//     size: 2
// }
// console.log(getVegetables(vegetableInfo))

// // 限定对象属性为只读
// let vegetableObj: Vegetables = {
//     type: 'tomato'
// }
// vegetableObj.type = 'carrot' // Cannot assign to 'type' because it is a read-only property.
// 限定数组元素为只读
interface ArrInter {
    0: number,
    readonly 1: string
}
let arr2: ArrInter = [1, 'a']
// arr2[1] = 'b' // Cannot assign to '1' because it is a read-only property.

// 接口 定义函数的结构
// interface AddFunc {
//     (num1: number, num2: number) : number
// }
// 保存 eslint会改为类型别名的方式
type AddFunc = (num1: number, num2: number)  => number
const add: AddFunc = (n1, n2) => n1 + n2

// 索引类型
// interface RoleDic {
//     [id: number]: string
// }
// const role1: RoleDic = {
//     1: 'super_admin'
// }

interface RoleDic {
    [id: string]: string
}
const role2: RoleDic = {
    a: 'super_admin',
    1: 'admin' // 这里js会把1转成了字符串
}
// const obj8 = {
//     123: 'a',
//     '123': 'b' // 只会保留这个
// }

// 接口的继承

// interface Vegetables {
    //     color: string
    // }
    // interface Tomato {
    //     color: string,
    //     radius: number
    // }
    // interface Carrot {
    //     color: string,
    //     length: number
    // }
    interface Vegetables {
        color: string
    }
    interface Tomato extends Vegetables {
        radius: number
    }
    interface Carrot extends Vegetables {
        length: number
    }
    const tomato: Tomato = {
        radius: 1,
        color: 'red'
    }
    const carrot: Carrot = {
        length: 2,
        color: 'orange'
    }

    // 混合类型接口
    // let count = 0
    // const countUp = () => count++
    // countUp()
    // countUp()
    // 全局变量可能会被污染

    // const countUp = (() => {
    //     let count = 0
    //     return () => {
    //         return count++
    //     }
    // })()
    // console.log(countUp()) // 0
    // console.log(countUp()) // 1
    // 利用闭包

    // let countUp = () => {
    //     countUp.count++
    // }
    // countUp.count = 0
    // countUp()
    // console.log(countUp.count) // 1
    // countUp()
    // console.log(countUp.count) // 2
    // 利用函数的属性，直接在浏览器中运行

    // ts3.1之前需要借助命名空间，3.1之后ts支持直接给函数添加属性
    interface Counter {
        (): void // 函数 没有返回值
        count: number // 属性 number类型
    }
    const getCounter = (): Counter => {
        const c = () => {c.count++}
        c.count = 0
        return c
    }
    const counter: Counter = getCounter()
    counter()
    console.log(counter.count) // 1
    counter()
    console.log(counter.count) // 2
    counter()
    console.log(counter.count) // 3

    // 接口涉及到类相关的在后面讲解