// 结构化

// 推断规则也适用于结构化的存在(对象字面量)
const person = {
    name: 'zhangsan',
    age: 11
};
let name =person.name;
let age =person.age;
name = 'lisi'
age = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
export {}