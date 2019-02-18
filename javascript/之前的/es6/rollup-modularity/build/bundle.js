(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    var util1 = {
        a: 100
    };

    function fn1() {
        console.log('fn1');
    }
    function fn2() {
        console.log('fn2');
    }

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    // 模块化

    console.log(util1);
    fn1();
    fn2();
    // babel es6 转 es5
    // [1,2,3].map(item => (item + 1))

    // Class 语法
    {
        var MathHandle = function () {
            function MathHandle(x, y) {
                classCallCheck(this, MathHandle);

                this.x = x;
                this.y = y;
            }

            createClass(MathHandle, [{
                key: 'add',
                value: function add() {
                    return this.x + this.y;
                }
            }]);
            return MathHandle;
        }();

        var m = new MathHandle(1, 2);
        console.log('Class 语法', m.add());
    }

})));
