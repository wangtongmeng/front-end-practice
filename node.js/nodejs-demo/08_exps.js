// const exports = module.exports // exports 相当于 module.exports 的快捷方式

// (
//   function(exports, require, module, _filename, _dirname) {
//     // code
//   }
// );

// exports.test = 100

// exports = { // 这样拿不到 exports
//   a: 1,
//   b: 2,
//   test: 100
// }

module.exports = { // 这样可以拿到
  a: 1,
  b: 2,
  test: 100
}

// exports 默认是 module.exports 的快捷方式，可以添加属性，但不能修改指向，如果修改了就变成普通对象了；在 commonJS 中，模块对外输出永远是 module.exports，如果 exports 改了指向就不在生效了
