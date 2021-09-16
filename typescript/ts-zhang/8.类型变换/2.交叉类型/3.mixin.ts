// mixin混入模式可以让你从两个对象中创建一个新对象，新对象会拥有着两个对象所有的功能


interface AnyObject {
    [prop: string]: any;
}

function mixin<T extends AnyObject, U extends AnyObject>(one: T,two: U): T & U {
    const result = <T & U>{};
    for (let key in one) {
        (<T>result)[key] = one[key];
    }
    for (let key in two) {
        (<U>result)[key] = two[key];
    }
    return result;
}

const x = mixin({ name: "zhangsan" }, { age: 11 });
console.log(x.name, x.age);
export {}