// 解构


// 推断规则也适用于解构

const person = {
    name: 'zhangsan',
    age: 11
};
let { name,age } = person;

age = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型

//数组也一样
const numbers = [1, 2, 3];
numbers[0] = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
export {}