(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function Vue(options) {
      // 进行Vue的初始化操作
      console.log(options);
    }

    return Vue;

})));
//# sourceMappingURL=vue.js.map
