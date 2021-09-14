// readonly

// 用 readonly 定义只读属性可以避免由于多人协作或者项目较为复杂等因素造成对象的值被重写

interface Person {
    readonly id: number;
    name: string
}
let tom: Person = {
    id: 1,
    name: 'zhangsan'
}
//   tom.id = 1; // Cannot assign to 'id' because it is a read-only property.ts(2540)
export { }