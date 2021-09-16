// keyof

// 索引类型查询操作符

interface Person {
    name: string;
    age: number;
    gender: 'male' | 'female';
}
//type PersonKey = 'name'|'age'|'gender';
type PersonKey = keyof Person;

function getValueByKey(p: Person, key: PersonKey) {
    return p[key];
}
let val = getValueByKey({ name: 'lisi', age: 10, gender: 'male' }, 'name');
console.log(val);

export { }