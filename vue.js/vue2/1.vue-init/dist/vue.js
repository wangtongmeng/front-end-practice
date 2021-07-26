(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{aaaaa}}
    // html字符串 =》 字符串  _c('div',{id:'app',a:1},'hello')

    function genProps(attrs) {
      // [{name:'xxx',value:'xxx'},{name:'xxx',value:'xxx'}]
      var str = '';

      for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];

        if (attr.name === 'style') {
          (function () {
            // color:red;background:blue
            var styleObj = {};
            attr.value.replace(/([^;:]+)\:([^;:]+)/g, function () {
              styleObj[arguments[1]] = arguments[2];
            });
            attr.value = styleObj;
          })();
        }

        str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
      }

      return "{".concat(str.slice(0, -1), "}");
    }

    function gen(el) {
      if (el.type == 1) {
        // element = 1 text = 3
        return generate(el);
      } else {
        var text = el.text;

        if (!defaultTagRE.test(text)) {
          return "_v('".concat(text, "')");
        } else {
          // 'hello' + arr + 'world'    hello {{arr}} {{aa}} world
          var tokens = [];
          var match;
          var lastIndex = defaultTagRE.lastIndex = 0; // CSS-LOADER 原理一样

          while (match = defaultTagRE.exec(text)) {
            // 看有没有匹配到
            var index = match.index; // 开始索引

            if (index > lastIndex) {
              tokens.push(JSON.stringify(text.slice(lastIndex, index)));
            }

            tokens.push("_s(".concat(match[1].trim(), ")")); // JSON.stringify()

            lastIndex = index + match[0].length;
          }

          if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)));
          }

          return "_v(".concat(tokens.join('+'), ")");
        }
      }
    }

    function genChildren(el) {
      var children = el.children; // 获取儿子

      if (children) {
        return children.map(function (c) {
          return gen(c);
        }).join(',');
      }

      return false;
    }

    function generate(el) {
      //  _c('div',{id:'app',a:1},_c('span',{},'world'),_v())
      // 遍历树 将树拼接成字符串
      var children = genChildren(el);
      var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? genProps(el.attrs) : 'undefined').concat(children ? ",".concat(children) : '', ")");
      return code;
    }

    var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 标签名 

    var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //  用来获取的标签名的 match后的索引为1的

    var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配开始标签的 

    var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配闭合标签的
    //           aa  =   "  xxx "  | '  xxxx '  | xxx

    var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // a=b  a="b"  a='b'

    var startTagClose = /^\s*(\/?)>/; //     />   <div/>
    // ast (语法层面的描述 js css html) vdom （dom节点）
    // html字符串解析成 对应的脚本来触发 tokens  <div id="app"> {{name}}</div>
    // 将解析后的结果 组装成一个树结构  栈

    function createAstElement(tagName, attrs) {
      return {
        tag: tagName,
        type: 1,
        children: [],
        parent: null,
        attrs: attrs
      };
    }

    var root = null;
    var stack = [];

    function start(tagName, attributes) {
      var parent = stack[stack.length - 1];
      var element = createAstElement(tagName, attributes);

      if (!root) {
        root = element;
      }

      if (parent) {
        element.parent = parent; // 当放入栈中时 继续父亲是谁

        parent.children.push(element);
      }

      stack.push(element);
    }

    function end(tagName) {
      var last = stack.pop();

      if (last.tag !== tagName) {
        throw new Error('标签有误');
      }
    }

    function chars(text) {
      text = text.replace(/\s/g, "");
      var parent = stack[stack.length - 1];

      if (text) {
        parent.children.push({
          type: 3,
          text: text
        });
      }
    }

    function parserHTML(html) {
      function advance(len) {
        html = html.substring(len);
      }

      function parseStartTag() {
        var start = html.match(startTagOpen);

        if (start) {
          var match = {
            tagName: start[1],
            attrs: []
          };
          advance(start[0].length);

          var _end; // 如果没有遇到标签结尾就不停的解析


          var attr;

          while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5]
            });
            advance(attr[0].length);
          }

          if (_end) {
            advance(_end[0].length);
          }

          return match;
        }

        return false; // 不是开始标签
      }

      while (html) {
        // 看要解析的内容是否存在，如果存在就不停的解析
        var textEnd = html.indexOf('<'); // 当前解析的开头  

        if (textEnd == 0) {
          var startTagMatch = parseStartTag(); // 解析开始标签

          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            continue;
          }

          var endTagMatch = html.match(endTag);

          if (endTagMatch) {
            end(endTagMatch[1]);
            advance(endTagMatch[0].length);
            continue;
          }
        }

        var text = void 0; // //  </div>

        if (textEnd > 0) {
          text = html.substring(0, textEnd);
        }

        if (text) {
          chars(text);
          advance(text.length);
        }
      }

      return root;
    } // 看一下用户是否传入了 , 没传入可能传入的是 template, template如果也没有传递
    // 将我们的html =》 词法解析  （开始标签 ， 结束标签，属性，文本）
    // => ast语法树 用来描述html语法的 stack=[]
    // codegen  <div>hello</div>  =>   _c('div',{},'hello')  => 让字符串执行
    // 字符串如果转成代码 eval 好性能 会有作用域问题
    // 模板引擎 new Function + with 来实现

    function compileToFunction(template) {
      var root = parserHTML(template); // 生成代码 

      var code = generate(root);
      var render = new Function("with(this){return ".concat(code, "}")); // code 中会用到数据 数据在vm上

      return render; // render(){
      //     return
      // }
      // html=> ast（只能描述语法 语法不存在的属性无法描述） => render函数 + (with + new Function) => 虚拟dom （增加额外的属性） => 生成真实dom
    }

    function patch(oldVnode, vnode) {
      if (oldVnode.nodeType == 1) {
        // 用vnode  来生成真实dom 替换原本的dom元素
        var parentElm = oldVnode.parentNode; // 找到他的父亲

        var elm = createElm(vnode); //根据虚拟节点 创建元素

        parentElm.insertBefore(elm, oldVnode.nextSibling);
        parentElm.removeChild(oldVnode);
      }
    }

    function createElm(vnode) {
      var tag = vnode.tag,
          data = vnode.data,
          children = vnode.children,
          text = vnode.text,
          vm = vnode.vm;

      if (typeof tag === 'string') {
        // 元素
        vnode.el = document.createElement(tag); // 虚拟节点会有一个el属性 对应真实节点

        children.forEach(function (child) {
          vnode.el.appendChild(createElm(child));
        });
      } else {
        vnode.el = document.createTextNode(text);
      }

      return vnode.el;
    }

    function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vnode) {
        // 既有初始化 又又更新 
        var vm = this;
        patch(vm.$el, vnode);
      };
    }
    function mountComponent(vm, el) {
      // 更新函数 数据变化后 会再次调用此函数
      var updateComponent = function updateComponent() {
        // 调用render函数，生成虚拟dom
        vm._update(vm._render()); // 后续更新可以调用updateComponent方法
        // 用虚拟dom 生成真实dom

      };

      updateComponent();
    }

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

        if (vm.$options.el) {
          // 将数据挂载到这个模板上
          vm.$mount(vm.$options.el);
        }
      };

      Vue.prototype.$mount = function (el) {
        var vm = this;
        var options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el; // 把模板转化成 对应的渲染函数 =》 虚拟dom概念 vnode =》 diff算法 更新虚拟dom =》 产生真实节点，更新

        if (!options.render) {
          // 没有render用template，目前没render
          var template = options.template;

          if (!template && el) {
            // 用户也没有传递template 就取el的内容作为模板
            template = el.outerHTML;
            var render = compileToFunction(template);
            options.render = render;
          }
        } // options.render 就是渲染函数
        // 调用render方法 渲染成真实dom 替换掉页面的内容


        mountComponent(vm); // 组件的挂载流程
      };
    }

    function createElement(vm, tag) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        children[_key - 3] = arguments[_key];
      }

      return vnode(vm, tag, data, data.key, children, undefined);
    }
    function createTextElement(vm, text) {
      return vnode(vm, undefined, undefined, undefined, undefined, text);
    }

    function vnode(vm, tag, data, key, children, text) {
      return {
        vm: vm,
        tag: tag,
        data: data,
        key: key,
        children: children,
        text: text // .....

      };
    }

    function renderMixin(Vue) {
      Vue.prototype._c = function () {
        // createElement
        return createElement.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
      };

      Vue.prototype._v = function (text) {
        // createTextElement
        return createTextElement(this, text);
      };

      Vue.prototype._s = function (val) {
        // stringify 
        if (_typeof(val) == 'object') return JSON.stringify(val);
        return val;
      };

      Vue.prototype._render = function () {
        var vm = this;
        var render = vm.$options.render; // 就是我们解析出来的render方法，同时也有可能是用户写的

        var vnode = render.call(vm);
        return vnode;
      };
    }

    function Vue(options) {
      // options 为用户传入的选项
      this._init(options); // 初始化操作， 组件

    } // 扩展原型的


    initMixin(Vue);
    renderMixin(Vue); // _render

    lifecycleMixin(Vue); // _update
    // $mount 找render方法  （template-> render函数  ast => codegen =>字符串）
    // render = with + new Function(codegen) 产生虚拟dom的方法 
    // 虚拟dom -> 真实dom 
    // vm._update(vm._render()); 先生成虚拟dom  -》 生成真实的DOM元素
    // 初次渲染

    return Vue;

})));
//# sourceMappingURL=vue.js.map
