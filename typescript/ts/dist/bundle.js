(function () {
  'use strict';

  // interface 描述对象的形状和结构，可以给数据增添类型， 而且方便复用
  var fn = (function () {
      // 函数返回函数 一般要标识函数的返回类型
      return fn.count++;
  });
  fn.count = 0;
  console.log(fn());
  console.log(fn());

}());
//# sourceMappingURL=bundle.js.map
