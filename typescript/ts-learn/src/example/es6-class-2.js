// es5中的继承

// function Food () {
//     this.type = 'food'
// }
// Food.prototype.getType = function () {
//     return this.type
// }
// function Vegetables () {
//     this.name = name
// }
// Vegetables.prototype = new Food()
// const tomato = new Vegetables('tomato')
// console.log(tomato.getType()) // food

// es6中的继承

// class Parent {
//     constructor (name) {
//         this.name = name
//     }
//     getName () {
//         return this.name
//     }
// }

// class Child extends Parent {
//     constructor (name, age) {
//         super(name)
//         this.age = age
//     }
// }
// const c = new Child('zhangsan', 18)
// console.log(c) // Child {name: "zhangsan", age: 18}
// console.log(c.getName()) // zhangsan
// console.log(c instanceof Child) // true
// console.log(c instanceof Parent) // true

// // Object.getPrototypeOf

// console.log(Object.getPrototypeOf(Child) === Parent) // true

// super 作为函数
// super 作为对象
// 在普通方法指向父类的原型对象 在静态方法中，指向的是父类本身

// class Parent {
//     constructor () {
//         this.type = 'parent'
//     }
//     getName () {
//         return this.type
//     }
// }
// Parent.getType = () => {
//     return 'is parent'
// }
// class Child extends Parent {
//     constructor () {
//         super()
//         console.log('constructor: ' + super.getName())
//     }
//     getParentName(){
//         // 这里super指向的是父类的prototype对象
//         console.log('getParentName: ' + super.getName())
//     }
//     // getParentType(){
//     //     console.log('getParentType:' + super.getType()) // 这里拿不到父类本身的方法
//     // }
//     static getParentType(){
//         console.log('getParentType:' + super.getType()) // 这里拿不到父类本身的方法
//     }
// }

// const c = new Child() // constructor: parent
// c.getParentName() // getParentName: parent
// Child.getParentType() // getParentType:is parent

class Parent {
    constructor () {
        this.name = 'parent'
    }
    print () {
        console.log(thi.name)
    }
}
class Child extends Parent {
    constructor () {
        super()
        this.name = 'child'
    }
    childPrint () {
        super.print()
    }
}

const c = new Child()
c.childPrint() // child ，因为父类原型上的print方法中的this指向Child

// 类的prototype属性和`__proto__`属性




