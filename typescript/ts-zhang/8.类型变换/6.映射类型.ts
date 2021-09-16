// 映射类型

// 1.在定义的时候用in操作符去批量定义类型中的属性

interface Person {
    name: string;
    age: number;
    gender: 'male' | 'female';
}
//批量把一个接口中的属性都变成可选的
type PartPerson = {
    [Key in keyof Person]?: Person[Key]
}

let p1: PartPerson = {};
//也可以使用泛型
type Part<T> = {
    [key in keyof T]?: T[key]
}
let p2: Part<Person> = {};


// 2.通过key的数组获取值的数组
function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map((n) => o[n]);
}
let user = { id: 1, name: 'lisi' };
type User = typeof user;
const res = pick<User, keyof User>(user, ["id", "name"]);
console.log(res);

export { }