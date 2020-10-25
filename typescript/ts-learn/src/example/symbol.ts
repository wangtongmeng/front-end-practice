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
console.log(s4.toString()) // Symbol(zhangsan)
console.log(Boolean(s4)) // true
console.log(!s4) // false
// symbol可以作为属性名
let prop = 'name'
const info = {
    // name: 'zhangsan'
    // [prop]: 'zhangsan'
    [`my${prop}is`]: 'zhangsan'
}
console.log(info)
const s5 = Symbol('name')
const info2 = {
    [s5]: 'zhangsan',
    age: 18,
    sex: 'man'
}
console.log(info2)
info2[s5] = 'lisi' // 可以在类中实现私有属性/方法的效果
console.log(info2)
// 属性名的遍历

// 这四种不行
for (const key in info2) {
    console.log(key) // age sex
}

console.log(Object.keys(info2)) // ["age", "sex"]

console.log(Object.getOwnPropertyNames(info2)) // ["age", "sex"]

console.log(JSON.stringify(info2)) // {"age":18,"sex":"man"}

// 返回对象中所有symbol类型的属性名
console.log(Object.getOwnPropertySymbols(info2)) // [Symbol(name)]

console.log(Reflect.ownKeys(info2)) // ["age", "sex", Symbol(name)]

// symbol的两个静态方法
// Symbol.for() Symbol.keyFor() 返回symbol值
const s6 = Symbol('zhangsan')
const s7 = Symbol('zhangsan')
const s8 = Symbol.for('zhangsan')
const s9 = Symbol.for('zhangsan') // 先去全局找，如果有直接返回，不在重新创建
// console.log(s8 === s9) // true copy到浏览器中
