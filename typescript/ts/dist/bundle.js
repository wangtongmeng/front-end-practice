(function () {
  'use strict';

  // https://www.tslang.cn/docs/home.html
  // 元组 ts中自己实现的 内容固定 类型固定
  var tuple = ["a", true, 1]; // 初始化 必须按照要求填入数据
  // 操作元组
  tuple.pop(); // pop的有可能是这四种类型 let r: string | number | boolean | undefined
  tuple.push("str"); // 在放入时 可以放入元组中定义的类型
  tuple[2] = 100;
  console.log("USER" /* USER */);
  // Symbol BigInt js的类型 用的不多
  var s1 = Symbol(1);
  var s2 = Symbol(2);
  console.log(s1 === s2); // false es6语法无法编译成es5
  var max = Number.MAX_SAFE_INTEGER;
  BigInt(max);
  console.log(max + 1 === max + 2); // true
  console.log(BigInt(max) + BigInt(1) === BigInt(max) + BigInt(2)); // false

}());
//# sourceMappingURL=bundle.js.map
