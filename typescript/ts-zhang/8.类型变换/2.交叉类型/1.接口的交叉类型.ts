// 交叉类型


/* 
交叉类型(Intersection Types)是将多个类型合并为一个类型
这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性
*/


//TypeScript 交叉类型是将多个类型合并为一个类型
//这让我们可以把现有的多种类型叠加到一起成为一种类型
//它包含了所需的所有类型的特性

//接口的交叉类型
interface Bird {
    name: string,
    fly(): void
}
interface Person {
    name: string,
    talk(): void
}
type BirdPerson = Bird & Person;
let p: BirdPerson = { name: 'zhangsan', fly() { }, talk() { } };
p.fly;
p.name
p.talk;

export {}