(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function isFunction(val) {
    return typeof val === 'function';
  }
  function isObject(val) {
    return _typeof(val) == 'object' && val !== null;
  }

  var oldArrayPrototype = Array.prototype;
  var arrayMethods = Object.create(oldArrayPrototype); // arrayMethods.__proto__ = Array.prototype 继承

  var methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    // 用户调用的如果是以上七个方法 会用我自己重写的，否则用原来的数组方法
    arrayMethods[method] = function () {
      var _oldArrayPrototype$me;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      //  args 是参数列表 arr.push(1,2,3)
      (_oldArrayPrototype$me = oldArrayPrototype[method]).call.apply(_oldArrayPrototype$me, [this].concat(args)); // arr.push(1,2,3);


      var inserted;
      var ob = this.__ob__; // 根据当前数组获取到observer实例

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args; // 就是新增的内容

          break;

        case 'splice':
          inserted = args.slice(2);
      } // 如果有新增的内容要进行继续劫持, 我需要观测的数组里的每一项，而不是数组
      // 更新操作.... todo...


      if (inserted) ob.observeArray(inserted); // arr.push(1,2)
      // arr.splice(0,1,xxxx)
    };
  });

  // 2.如果是数组，会劫持数组的方法，并对数组中不是基本数据类型的进行检测
  // 检测数据变化 类有类型 ， 对象无类型

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      // 对对象中的所有属性 进行劫持
      Object.defineProperty(data, '__ob__', {
        value: this,
        enumerable: false // 不可枚举的

      }); // data.__ob__ = this; // 所有被劫持过的属性都有__ob__ 

      if (Array.isArray(data)) {
        // 数组劫持的逻辑
        // 对数组原来的方法进行改写， 切片编程  高阶函数
        data.__proto__ = arrayMethods; // 如果数组中的数据是对象类型，需要监控对象的变化

        this.observeArray(data);
      } else {
        this.walk(data); //对象劫持的逻辑 
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(data) {
        // 对我们数组的数组 和 数组中的对象再次劫持 递归了
        // [{a:1},{b:2}]
        data.forEach(function (item) {
          return observe(item);
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        // 对象
        Object.keys(data).forEach(function (key) {
          // Object.keys 只会遍历自身属性
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }(); // vue2 会对对象进行遍历 将每个属性 用defineProperty 重新定义 性能差


  function defineReactive(data, key, value) {
    // value有可能是对象
    observe(value); // 本身用户默认值是对象套对象 需要递归处理 （性能差）

    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newV) {
        // todo... 更新视图
        observe(newV); // 如果用户赋值一个新对象 ，需要将这个对象进行劫持

        value = newV;
      }
    });
  }

  function observe(data) {
    // 如果是对象才观测
    if (!isObject(data)) {
      return;
    }

    if (data.__ob__) {
      return;
    } // 默认最外层的data必须是一个对象


    return new Observer(data);
  }

  function initState(vm) {
    // 状态的初始化
    var opts = vm.$options;

    if (opts.data) {
      initData(vm);
    } // if(opts.computed){
    //     initComputed();
    // }
    // if(opts.watch){
    //     initWatch();
    // }

  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  function initData(vm) {
    //
    var data = vm.$options.data; // vm.$el  vue 内部会对属性检测如果是以$开头 不会进行代理
    // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty
    // 这个时候 vm 和 data没有任何关系, 通过_data 进行关联

    data = vm._data = isFunction(data) ? data.call(vm) : data; // 用户去vm.xxx => vm._data.xxx

    for (var key in data) {
      // vm.name = 'xxx'  vm._data.name = 'xxx'
      proxy(vm, '_data', key);
    }

    observe(data);
  }

  function initMixin(Vue) {
    // 表示在vue的基础上做一次混合操作
    Vue.prototype._init = function (options) {
      // el,data
      var vm = this; // var that = this;

      vm.$options = options; // 后面会对options进行扩展操作
      // 对数据进行初始化 watch computed props data ...

      initState(vm); // vm.$options.data  数据劫持
    };
  }

  function Vue(options) {
    // options 为用户传入的选项
    this._init(options); // 初始化操作， 组件

  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
