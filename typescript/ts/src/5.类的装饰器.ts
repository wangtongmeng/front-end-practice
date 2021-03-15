// 装饰器 es7语法 是一个实验性语法 后面会有改动 vue2刚开始用的就是装饰器
// 装饰器的作用 扩展类 扩展类中的属性和方法，不能修饰函数，函数会有变量提升的问题

// "experimentalDecorators": true,

function addSay1(val: string) { // 洋葱模型 a1 a2 a3 3 2 1
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
class Person {}

export {};
