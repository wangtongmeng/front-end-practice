// 在js中，类 最早是用构造函数来代替的 -> es6 类的概念 (编译完还是function)
// 实例属性、方法(new xx 来调用)  静态属性、方法(类调用 xx.)， 原型属性、方法

// class Pointer {
//   // x:number // 必须在constructor中有初始化操作  this.x = x;
//   // x!:number
//   // x: number = 1; // 也可以设默认值，声明的变量会被增加到实例上，这是constructor中可以不写this.x = x
//   x: number;
//   y: number;
//   // constructor还是函数 依然可以使用 剩余运算符 可选参数 默认参数
//   constructor(x: number, y: number) {
//     // 在constructor中的操作都是初始化操作
//     this.x = x;
//     this.y = y;
//   }
// }

// 属性修饰符
// public 声明的变量会被增加到实例上，自己和子类和子类之外都可以访问到
// protected 只有自己和自己的子孙能访问
// private // 只有自己能访问
// readonly 进度(类似const) 如果在初始化完毕后不能再修改了 如果是对象可以更改对象的属性
// 也可以给构造函数添加修饰符 默认是public，如果标识成protected不能被new，如果标识成private不能被继承和new
class Pointer {
  public x: number; //  不写修饰符 等价于 public x:number 1.这里public x:number 需配合constructor内初始化 this.x = x
  // y: number;
  constructor(x: number, public y: number) {
    // 2.加了public 属性会增加到实例上，所以constructor内可以不写this.x = x;
    this.x = x;
    // this.y = y;
  }
}

class Animal {
  public readonly n: number = 1;
  constructor(public name: string, public age: number) {
    console.log("Animal name", this.name);
    this.n = 2;
  }

  // 静态属性
  static type = "哺乳动物"; // 静态属性 es7语法  ts支持es7语法
  // static get type(){ // es6写法 属性访问器
  //   return '不如动物'
  // }

  // 静态方法
  static getName() {
    return "动物";
  }
  static getXXX () {
    return 'xxx'
  }

  say () {
    console.log('Animal say')
  }
}

console.log('Animal', Animal.type, Animal.getName(), Animal.getXXX())

class Cat extends Animal {
  constructor(name: string, age: number, public address: string) {
    super(name, age); // Animal.call(this.name,age)
    console.log("Cat name", this.name);
  }
  
  // 静态方法和属性可以被继承 super默认在构造函数中和静态方法中都指向自己的父类，在原型方法中 super指向父类的原型
  static type = '猫科灯舞'
  static getName(){
    console.log(super.getName()) // 如果子类里有相同的静态方法，可以通过super方法父类的同步静态方法
    return '猫'
  }

  // 原型方法
  say(){ // 原型方法岁的super指向的父类原型
    super.say()
  } 
  // 原型属性
  private str:string = ''
  get content(){ // 属性访问器的好处 可以访问私有属性
    return this.str
  }
  set content(newVal:string){
    this.str = newVal
  }
  // aaa =1 // es7语法 ts不建议使用 会做为实例属性
}

console.log('Cat', Cat.type, Cat.getName(), Cat.getXXX())

// 原型方法直接写就是原型方法，可以通过属性访问器定义原型属性
let cat = new Cat("Tom", 9, "美国");
cat.say()
console.log(cat);

let p = new Pointer(100, 100);
console.log(p);
export {};
