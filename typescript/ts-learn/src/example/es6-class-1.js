// 创建实例

const { HighlightSpanKind } = require("typescript")

// es5
// function Point(x, y) {
//     this.x = x
//     this.y = y
// }
// Point.prototype.getPosition = function () {
//     return '(' + this.x + ', ' + this.y + ')'
// }
// var p1 = new Point(2,3)
// console.log(p1) // Point {x: 2, y: 3}
// console.log(p1.getPosition()) // (2, 3)
// es6
// class Point {
//     constructor (x,y) {
//         this.x = x
//         this.y = y
//         // return { a: 'a' } 如果返回自定义对象，则实例原型不指向Point.__proto__，也就获取不到getPosition了
//     }
//     getPosition() {
//         return `(${this.x}, ${this.y})`
//     }
// }
// var p1 = new Point(2,3)
// console.log(p1) // Point {x: 2, y: 3}
// console.log(p1.getPosition()) // (2, 3)
// console.log(p1.hasOwnProperty('x')) // true
// console.log(p1.hasOwnProperty('getPostion')) // false
// console.log(p1.__proto__.hasOwnProperty('getPosition')) // true

// 取值函数和存值函数

// es5
// var info = {
//     _age: 18,
//     set age (newValue) {
//         if (newValue > 18) {
//             console.log('变老了')
//         } else {
//             console.log('还年轻')
//         }
//         this._age = newValue
//     },
//     get age () {
//         console.log('我的年龄是')
//         return this._age
//     }
// }
// console.log(info.age)
// info.age = 17
// console.log(info.age)
// info.age = 19
// console.log(info.age)
// es6
// class Info {
//     constructor (age) {
//         this._age = age
//     }
//     set age (newAge) {
//         console.log('new age is: ' + newAge)
//         this._age = newAge
//     }
//     get age () {
//         return this._age
//     }
// }
// const infos = new Info(18)
// infos.age = 17 // new age is: 17
// console.log(infos.age) // 17

// class表达式

// 函数的定义方式
// const func = function () {}
// function func () {}
// class的定义方法
// class Infos {
//     constructor () {}
// }
// const Infos = class c {
//     constructor () {}
// }
// const Infos = class {
//     constructor () {}
// }
// const testInfo = new Infos()

// 静态方法 不被继承，只被类本身(作为对象)使用

// function testFunc () {}
// console.log(testFunc.name) // testFunc
// class Point {
//     constructor (x, y) {
//         this.x = x
//         this.y = y
//     }
//     getPosition () {
//         return `(${this.x}, ${this.y})`
//     }
//     static getClassName () {
//         return Point.name
//     }
// }
// console.log(Point.name) // Point

// 静态属性

// es6只支持静态方法，不支持静态属性，如果要给类添加静态属性，可以如下
// 最新的提案也支持静态属性
// class Point {
//     constructor () {
//         this.x = 0
//     }
// }
// Point.y  = 2
// const p = new Point()
// console.log(p.y) // undefined
// console.log(Point.y) // 2

// 私有方法

// 通过symbol值实现私有方法的效果
// b.js
// import Point from './a.js'
// const p = new Point()
// console.log(p)

// 私有属性

// 新的提案，babel暂时无法转义
// class Point {
//     #ownProp =12
// }

// new.target属性

// function Point () {
//     console.log(new.target)
// }
// const p = new Point()
// console.log =>
// ƒ Point () {
//     console.log(new.target)
// }
// const p2 = Point() // undefined

class Point {
    constructor () {
        console.log(new.target)
    }
}
const p3 = new Point()

// console.log =>
// class Point {
//     constructor () {
//         console.log(new.target)
//     }
// }

// 只让子类可以实例化
class Parent {
    constructor () {
        if (new.target === Parent) {
            throw new Error('不能实例化')
        }
    }
}
class Child extends Parent {
    constructor () {
        super()
    }
}
const c = new Parent() // 抛出错误