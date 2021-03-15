// 装饰器 es7语法 是一个实验性语法 后面会有改动 vue2刚开始用的就是装饰器
// 装饰器的作用 扩展类 扩展类中的属性和方法，不能修饰函数，函数会有变量提升的问题

// "experimentalDecorators": true,

function addSay1(val: string) {
  // 洋葱模型 a1 a2 a3 3 2 1
  console.log(val);
  return function (target: any) {
    console.log(1);
  };
}
function addSay2(val: string) {
  console.log(val);
  return function (target: any) {
    console.log(2);
  };
}
function addSay3(val: string) {
  console.log(val);
  return function (target: any) {
    console.log(3);
  };
}

// @addSay1("a1")
// @addSay2("a2")
// @addSay3("a3") // 等价于 addSay1(addSay2(addSay3(Person)))
// class Person {}

function eat(target: any) {
  // target => 类
  target.prototype.eat = function () {
    console.log("eat");
  };
}

function toUpperCase(target: any, key: string) {
  // target => 类的原型，key就是修饰的属性
  let val: string = "";
  Object.defineProperty(target, key, {
    get() {
      return val.toUpperCase();
    },
    set(newVal: string) {
      console.log(newVal);
      val = newVal;
    },
  });
}
function double(num: number) {
  return function (target: any, key: string) {
    // target => 类
    let v = target[key];
    Object.defineProperty(target, key, {
      get() {
        return num * v;
      },
    });
  };
}
function Enum(bool: boolean) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // target => 原型
    descriptor.enumerable = bool;
  };
}

function params(target:any, key:string, index:number) { // target=>原型 key=>drink index=>0
  console.log(key,index)
}

// @eat
class Person {
  // eat!: ()=>void // 怪异 为了跑通代码
  @toUpperCase
  public name: string = "tm";

  @double(2)
  static age: number = 18;

  @Enum(false)
  // 还可以修饰参数
  drink(@params content:any) {}
}

let p = new Person();
console.log(p.name);
console.log(Person.age);
console.log(p);
// p.eat()
p.drink('xxx')

export {};
