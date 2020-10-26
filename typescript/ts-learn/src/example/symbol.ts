/* 
tsconfig.json，引入es6的库，防止报错
"lib": [
      "es6"
    ], 
*/
// 创建symbol，独一无二的值
const s1 = Symbol();
console.log(s1);
const s2 = Symbol();
console.log(s2);
// console.log(s1 === s2); // 直接copy到浏览器中 false
// 创建的时候传参，作为标识
const s3 = Symbol("zhangsan");
console.log(s3);
const s4 = Symbol("zhangsan");
console.log(s4);
// console.log(s3 === s4); // 直接copy到浏览器中 false
// 如果传入的是数字，在内部会先转成字符串；在ts中只能传入string或number
// const s5 = Symbol({a: 'a'}) // 传入对象会调用toStirng()转成字符串 Symbol([object Object])
// symbol不能和其他值做运算
// symbol可以转换成字符串或布尔，本身不会本修改
console.log(s4.toString()); // Symbol(zhangsan)
console.log(Boolean(s4)); // true
console.log(!s4); // false
// symbol可以作为属性名
let prop = "name";
const info = {
  // name: 'zhangsan'
  // [prop]: 'zhangsan'
  [`my${prop}is`]: "zhangsan",
};
console.log(info);
const s5 = Symbol("name");
const info2 = {
  [s5]: "zhangsan",
  age: 18,
  sex: "man",
};
console.log(info2);
info2[s5] = "lisi"; // 可以在类中实现私有属性/方法的效果
console.log(info2);
// 属性名的遍历

// 这四种不行
for (const key in info2) {
  console.log(key); // age sex
}

console.log(Object.keys(info2)); // ["age", "sex"]

console.log(Object.getOwnPropertyNames(info2)); // ["age", "sex"]

console.log(JSON.stringify(info2)); // {"age":18,"sex":"man"}

// 返回对象中所有symbol类型的属性名
console.log(Object.getOwnPropertySymbols(info2)); // [Symbol(name)]

console.log(Reflect.ownKeys(info2)); // ["age", "sex", Symbol(name)]

// symbol的两个静态方法
// Symbol.for() Symbol.keyFor(当前页面，嵌套的iframe、serviceworker) 返回symbol值
const s6 = Symbol("zhangsan");
const s7 = Symbol("zhangsan");
const s8 = Symbol.for("zhangsan");
const s9 = Symbol.for("zhangsan"); // 先去全局找，如果有直接返回，不在重新创建
// console.log(s8 === s9) // true copy到浏览器中

// 返回Symbol.for('...')的标识
console.log(Symbol.keyFor(s8)); // zhangsan

// 11个内置的symbol值,指向js内部的属性和方法

// 1.Symbol.hasInstance，当把Symbol.hasInstance作为对象的方法名时，当对象调用instanceof时，会执行
const obj1 = {
  [Symbol.hasInstance](otherObj) {
    console.log(otherObj);
  },
};
console.log({ a: "a" } instanceof <any>obj1); // {a: 'a'} false

// 2.Symbol.isConcatSpreadable 可读写的布尔值
let arr = [1, 2];
console.log([].concat(arr, [3, 4])); // [1, 2, 3, 4]
console.log(arr[Symbol.isConcatSpreadable]); // undefined
arr[Symbol.isConcatSpreadable] = false; // 调用concat不扁平化
console.log([].concat(arr, [3, 4])); // [Array(2), 3, 4]
console.log(arr[Symbol.isConcatSpreadable]); // false
// 3. Symbol.species 指定创建衍生对象的构造函数
class C extends Array {
  constructor(...args) {
    super(...args);
  }
  static get [Symbol.species]() {
    // 在浏览器中，若去掉则 a instanceof C 为true
    return Array;
  }
  getName() {
    return "zhangsan";
  }
}
const c = new C(1, 2, 3); // [1, 2, 3]
const a = c.map((item) => item + 1); // a 是 c 的衍生对象
// console.log(a) // [2,3,4]
// console.log(a instanceof C) // false
// console.log(a instanceof Array) // true

// 4. Symbol.match 指向一个内部方法，当字符串调用match方法时，会调用此方法
let obj3 = {
  [Symbol.match](string) {
    console.log(string.length);
  },
  [Symbol.split](string) {
    console.log("split", string.length);
  },
};
"abcde".match(<RegExp>obj3); // 5，利用此特性，最为match的返回值
// 5 6 7 . Symbol.replace Symbol.search Symbol.split 同上

"abcde".split(<any>obj3); // split 5

// 8. Symbol.iterator
// const arr = [1,2,3]
// const iterator = arr[Symbol.iterator]()
// iterator.next() // {value: 1, done: false}
// iterator.next() // {value: 2, done: false}
// iterator.next() // {value: 3, done: false}
// iterator.next() // {value: undefined, done: true}

// 9. Symbol.toPrimitive 对象的此属性指向一个方法，当对象被转为原始类型时会调用此方法。
let obj4: unknown = {
    [Symbol.toPrimitive] (type) {
        console.log(type)
    }
}
// const res = (obj4 as number)++ // number 自增操作时，会把对象转成数值类型，所成会触发
// const res = `abc${obj4}` // default （在浏览器中会是string，ts不同）

// 10. Symbol.toStringTag 对象的此属性指向一个属性/方法，当对象调用toStirng()方法时，对用此方法
let obj5 = {
    // [Symbol.toStringTag]: 'zhangsan'
    get [Symbol.toStringTag] () {
        return 'zhangsan'
    }
}
// console.log(obj5.toString()) // [object zhangsan]

// 11. Symbol.unscopables

const obj6 = {
    a: 'a',
    b: 'b'
}
// with (obj6) {
//     console.log(a) // a
//     console.log(b) // b
// }

console.log(Array.prototype[Symbol.unscopables])
/* 
这些方法在with中是无法获取的
{
    copyWithin: true
entries: true
fill: true
find: true
findIndex: true
flat: true
flatMap: true
includes: true
keys: true
values: true
}
*/
// let arr = [1,2]
// with (arr) {
//     console.log(findIndex(2)） // 获取不到
// }