// https://www.babeljs.cn/rep targets 填上 ie11

// 自己补充
let  regeneratorRuntime = {
    mark(genFn){
        return genFn
    },
    wrap(iteratorFn){
        const context = {
            next:0,
            done:false, // 表示迭代器没有完成
            stop(){
                this.done = true
            }
        }
        let it ={ };
        it.next = function (v) { // 用户调用的next方法
           context.sent = v
           let value = iteratorFn(context);
           return {
               value,
               done:context.done // 是否完成
           }
        }
        return it;
    }
}
// 自己补充

// babel转义
"use strict";

var _marked = /*#__PURE__*/regeneratorRuntime.mark(read);

function read() {
  var a, b, c;
  return regeneratorRuntime.wrap(function read$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          a = _context.sent;
          console.log(a); // b

          _context.next = 6;
          return 2;

        case 6:
          b = _context.sent;
          console.log(b); // c

          _context.next = 10;
          return 3;

        case 10:
          c = _context.sent;
          console.log(c); // d

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var it = read();
var obj = it.next('a'); // next的入参会给上一个yield的返回值，所以第一个next传参是没有意义的

console.log(obj); // { value: 1, done: false } 这里的value: 1 是 yield后表达式(promise，不是也会包装成promise)的结果

var obj = it.next('b');
console.log(obj); // { value: 2, done: false }

var obj = it.next('c');
console.log(obj); // { value: 3, done: false }

var obj = it.next('d');
console.log(obj); // { value: undefined, done: true }