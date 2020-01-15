// 查看jquery版本号 npm view jquery versions
// [
//   '1.5.1',       '1.6.2',       '1.6.3',
//   '1.7.2',       '1.7.3',       '1.8.2',
//   '1.8.3',       '1.9.1',       '1.11.0-beta3',
//   '1.11.0-rc1',  '1.11.0',      '1.11.1-beta1',
//   '1.11.1-rc1',  '1.11.1-rc2',  '1.11.1',
//   '1.11.2',      '1.11.3',      '1.12.0',
//   '1.12.1',      '1.12.2',      '1.12.3',
//   '1.12.4',      '2.1.0-beta2', '2.1.0-beta3',
//   '2.1.0-rc1',   '2.1.0',       '2.1.1-beta1',
//   '2.1.1-rc1',   '2.1.1-rc2',   '2.1.1',
//   '2.1.2',       '2.1.3',       '2.1.4',
//   '2.2.0',       '2.2.1',       '2.2.2',
//   '2.2.3',       '2.2.4',       '3.0.0-alpha1',
//   '3.0.0-beta1', '3.0.0-rc1',   '3.0.0',
//   '3.1.0',       '3.1.1',       '3.2.0',
//   '3.2.1',       '3.3.0',       '3.3.1',
//   '3.4.0',       '3.4.1'
// ]-

/*
 * 类库、插件、UI组件、框架
 *   1.类库:JQ/ZEPTO...  提供一些真实项目中常用的方法，任何项目都可以把类库导入进来，调取里面的方法实现自己需要的业务逻辑
 *   2.插件:具备一定的业务功能，例如，我们可以封装轮播图插件、选项卡插件、模态框插件等（插件规定了当前这个功能的样式结构，把实现功能的JS进行封装，以后想实现这个功能直接导入插件即可） swiper\iscroll\jquery-dialog\jquery-drag\jquery-datepicker\ECharts...
 *   3.UI组件:把结构、CSS、JS全部都封装好了,我们想实现一个功能直接导入进来即可（偶尔需要我们修改一下） bootstrap...
 *   4.框架:具备一定的编程思想，要求我们按照框架的思想开发，一般框架中提供了常用的类库方法，提供了强大的功能插件，有的也提供了强大的UI组件...  React(React native) / Vue / Angular / Backbone / Sea.js / Require.js ...
 *
 * jQuery(JQ)非常优秀的JS“类库”
 *    ->基于原生JS封装的一个类库，提供了很多的方法，而且这些方法是兼容所有浏览器的
 *    ->JQ版本
 *     V1 (常用) 1.8.3  1.9.3  1.11.3
 *     V2
 *     V3
 */
/**
 * 1.jQuery的结构
 */
// (function () {
//   var version = '1.11.3',
//     jQuery = function (selector, context) {
//       return new jQuery.fn.init(selector, context); //  创建了init这个类的实例，也相当于创建了jQuery这个类的实例（因为在后面的时候，让init.prototype=jQuery.ptototype）
//     };
//   // jQuery是一个类，在它的原型上提供了很多属性和方法，供JQ的实例调取使用
//   jQuery.fn = jQuery.prototype = {
//     jquery: version,
//     constructor: jQuery, // 当前类的原型重定向后，自己开辟的堆内存中是没有constructor的，需要手动增加保证它的完整性
//     filter: function () {},
//     // ...
//   };

//   // 给JQ原型上增加extend方法，同时把JQ当做一个普通对象，给这个对象设置一个私有方法
//   /**
//    * JQ是一个类（也是一个普通对象）：函数的两种角色，JQ是一个类库提供了很多方法，其中这些方法有两部分
//    *    1.放在JQ原型上的（jQuery.fn/jQuery.prototype），这里面的方法是供JQ实例调用的
//    *    2.把JQ当做一个普通的对象，在对象上设置一些私有的属性和方法，这类方法以后用的时候直接通过jQuery.xxx()执行即可
//    */
//   jQuery.extend = jQuery.fn.extend = function () {
//     // extend是把一个对象中的属性和方法扩展到指定的对象上
//   };

//   jQuery.extend({
//     isFunction: function (obj) {

//     },
//     isArray: function () {

//     },
//     // ...
//   });
//   // jQuery: {extend:...,isFunction:...,isArray:...}

//   // jQuery.fn.extend({
//   //   find: ...
//   // });
//   // jQuery.ptototype: {...,find:...}

//   var init = jQuery.fn.init = function (selector, context) {

//   };
//   init.prototype = jQuery.fn; // 把init当做一个类，但是让这类的原型指向了jQuery.prototype（init这个类的实例最后找到的也是jQuery这个类原型上的方法 => init的实例可以理解为jQuery的实例）

//   window.jQuery = window.$ = jQuery;
// })();

// $().filter() // 创建一个jQuery类的实例，可以调取jQuery.fn中的方法
// $.isFunction() // 把JQ当做一个普通对象，直接的使用对象上扩展的那些私有属性和方法（这些方法和实例没关系）

// JQ选择器：基于各种选择器创建一个JQ实例（JQ对象）
// 1.selector 选择器的类型（一般都是字符串，但是支持函数或者元素对象）
// 2.context 基于选择器获取元素时指定的上下文（默认是document）
// JQ对象：一个类数组结构（JQ实例），这个类数组集合中包含了获取到的元素

// console.log($('.tabBox'))
/**
 * JQ对象（类数组）=>JQ实例
 *  0: div.tabBOx
 *  length: 1,
 *  context: document,
 *  selector: '.tabBox'
 * 
 *  __proto__: jQuery.prototype
 *    add
 *    ...
 *    __proto__: Object.prototype
 *      hasOwnproperty
 *      ...
 *    
 */

 /**
  * 获取页面中的元素对象
  *   1.基于原生JS提供的属性和方法获取 => '原生JS对象'
  *     可以调取内置的JS属性和方法，如className、onclick...
  *   2.基于JQ选择器获取 => 'JQ对象'
  *     可以调取JQ原型上提供的属性和方法，如add、find...
  * 
  * 把JQ对象和原生JS对象之间相互转换
  * 
  *   [把JQ对象->原生JS对象]
  *     JQ对象是一个类数组集合，集合中每个索引对应的都是原生JS对象，我们基于索引获取即可
  *     let $tabBox=$('.tabBox') 变量名前面是以$开始的，一般代表基于JQ选择器获取的结果
  *     let tabBox = $tabBox[0]
  *         tabBox = $tabBox.get(0) // get方法是JQ原型上提供的方法，供JQ实例基于索引获取到指定的JS对象
  *            $tabBox.eq(0)：它也是基于索引获取集合中的某一项，只不过get获取的是JS对象，EQ会把获取的结果包裹成一个新的JQ对象（JQ实例返回）
  *   [把原生JS->JQ]
  *     let tabBox = document.querySelector('.tabBox')
  *     $(tabBox) 直接使用选择器把原生JS对象包裹起来，就会把JS转换为JQ对象（因为$()就是创建JQ的一个实例）
  */
// let $tabBox = $('.tabBox')
// let tabBox = document.querySelector('.tabBox)

/**
 * 分析选择器源码，发现 selector 传递的值支持三种类型
 *  1.string：基于选择器获取元素
 *  2.元素对象 selector.nodeType：把JS对象转换成JQ对象
 *  3.函数：把传递的函数执行，把JQ当做实参传递给函数
 *    selector(jQuery)
 */
// $(function ($) {
//   // $:传递进来的jQuery
//   console.log($.prototype)
// })


// jQuery(() => {
//   // 函数肯定会执行，但是会在当前页面中的HTML结构都加载完成后再执行
//   // 函数执行会形成一个闭包
// })
// $(function () {
//   // code
// })

/**
 * JQ的常用方法
 */
