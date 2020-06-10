(function (global, factory) {
	"use strict"; //代码使用严格模式（高程三：严格模式和非严格模式的区别）
	if (typeof module === "object" && typeof module.exports === "object") {
		// 说明是支持CommonJS模块规范的（例如:Node）
		// ...
	} else {
		// 浏览器端
		// factory(window) => function (window, noGlobal){
		//    window===window
		//    noGlobal===undefined
		// }
		factory(global);
	}
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

	// $() JQ选择器
	var jQuery = function (selector, context) {
		return new jQuery.fn.init(selector, context);
	};

	// ***************** extend向JQ和JQ原型上扩展方法
	// =>向原型扩展方法是给JQ实例用的，一般应用于JQ插件封装
	// =>向JQ对象中扩展的方法是为了完善类库
	// $.fn.extend({})  $.fn.extend(true,{}) 
	jQuery.extend = jQuery.fn.extend = function () {

	};

	jQuery.fn.each = function (callback) {
		// jQuery.each(JQ实例,callback);
		return jQuery.each(this, callback);
	};

	jQuery.each = function (obj, callback) {
		// obj可以是数组(类数组) 或者 对象 
		// =>遍历对象/数组/类数组中的每一项的
		if (isArrayLike(obj)) {
			for (var i = 0; i < obj.length; i++) {
				var item = obj[i];
				var result = callback.call(obj[i], i, obj[i]);
				if (result === false) {
					break;
				}
			}
		} else {
			// 对象换成for in循环即可
		}
	};

	// ***************** jQuery是一个类
	jQuery.fn = jQuery.prototype = {
		// 保证原型对象上的构造函数完整性
		constructor: jQuery,
		// ...
	};

	// init也是一个类  
	// new jQuery.fn.init() =>$()选择器是创建这个类的一个实例
	// 实例本应该指向init.prototype，但是我们让init.prototype=jQuery.prototype，所以最终这个init类的实例的__proto__指向的是jQuery.prototype，也就类似于创建了一个JQ类的实例  =>$()JQ选择器就是JQ类的一个实例，此实例可以调取JQ原型上的方法
	var init = jQuery.fn.init = function (selector, context) {

	};
	init.prototype = jQuery.fn = jQuery.prototype;

	// ************************ JQ当做一个普通对象
	jQuery.Callbacks = function () {};


	// ************************
	// 冲突处理的（一个项目中引入了多个类库，其中有一个类库（例如：zepto）用的也是$ =>$===Zepto；如果此时我们也导入了JQ，那么$到底代表谁就冲突了）
	// => $.noConflict()
	var _jQuery = window.jQuery,
		_$ = window.$;
	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}
		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}
		return jQuery;
	};

	// 如果是浏览器端运行，条件成立  !undefined
	if (!noGlobal) {
		// 把jQuery或者$暴露到全局对象中  $===jQuery
		window.jQuery = window.$ = jQuery;
	}
});

//=>JQ选择器其实就是把jQuery方法执行
// $() => function (selector, context) {}让他执行
// $('.box') 获取当前页面中样式类为box的盒子（范围/上下文：整个页面）
// $('#banner .box')  $('#banner').find('.box')  <=> $('.box',document.getElementById('banner')) context是用来指定获取的上下文

/*
 * typeof window !== "undefined" ? window : this
 *   区分在浏览器端运行还是Node端运行 
 *      typeof xx：如果xx不存在，也不会报错，而是返回undefined（JS中的暂时性死区问题）  typeof window !== "undefined"：说明是在浏览器端或者webview端运行
 *      不存在说明是Node端运行，this代指当前Node模块（或global全局对象）
 *   factory = function (window, noGlobal){......}
 */