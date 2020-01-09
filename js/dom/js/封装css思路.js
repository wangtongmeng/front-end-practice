// 获取当前元素的某一个样式属性值
// let getCss = function (curEle, attr) {
//   if ('getComputedStyle' in window) {
//     let val = window.getComputedStyle(curEle, null)[attr]
//     // 把获取的结果去除单位（不是所有的值都能去单位的，例如：display\一些复合值都去不掉单位），只有符合 数字+单位 这种模式的结果才能基于parseFloat去单位
//     let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
//     reg.test(val) ? val = parseFloat(val) : null;
//     return val;
//   }
//   // throw new SyntaxError：抛出一个错误(语法错误),让浏览器崩溃,不在继续执行JS
//   throw new SyntaxError('您的浏览器版本过低，请升级到最新版本，谢谢配合！！');
// }
// // test
// console.log(getCss(outer, 'width'));

// =>获取当前元素的某一个样式属性值
let getCss = function (curEle, attr) {
  if (typeof window.getComputedStyle === 'undefined') {
    // 当前浏览器不兼容getComputedStyle
    return;
  }
  let val = window.getComputedStyle(curEle, null)[attr],
    reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
  reg.test(val) ? val = parseFloat(val) : null;
  return val;
}
// =>设置当前元素的某一个具体样式的属性值
// JS中给元素设置样式只有两种
// 1.设置元素的样式类名（前提：样式类及对应的样式已经处理完成）
// 2.通过行内样式设置 xxx.style.xxx=xxx
let setCss = function (curEle, attr, value) {
  /**
   * 细节处理
   *    1.如果考虑IE6~8兼容，透明度这个样式在低版本浏览器中不是使用opacity, 而是filter(两套都设置)
   *    2.如果传递进来的value值没有带单位，根据情况设置px单位
   *      ->某些样式属性需要加单位：width/height/padding(left etc)margin(left etc)/font-size/top/left/bottom/right...
   *      ->用户自己传递的value值是没有单位的
   */
  if (attr === 'opacity') {
    curEle.style.opacity = value
    curEle.style.filter = `alpha(opacity=${value * 100})`
    return
  }
  if (!isNaN(value)) {
    // isNaN检测的结果是false：说明value是纯数字没单位
    let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i
    reg.test(attr) ? value += 'px' : null
  }
  curEle['style'][attr] = value
}
// 给元素批量设置样式
let setGroupCss = function (curEle, options = {}) {
  // =>遍历传递的options，有多少键值对就循环多少次，每次都调取setCss方法注意设置即可
  for (const attr in options) {
    if (!options.hasOwnProperty(attr)) break;
    //=>options:传递进来的需要修改的样式对象(集合)
    //=>attr:每一次遍历到的集合中的某一项(要操作的样式属性名)
    //=>options[attr]:传递的要操作的样式属性值
    setCss(curEle, attr, options[attr])
  }
}

// setGroupCss(outer, {
//     width: 400,
//     height: 400,
//     padding: 30
// });
//=>CSS：集合get/set/setGroup 为一体的方法
// let css = function (...arg) {
//   // arg：传递的实参集合
//   let len = arg.length
//   if (len >= 3) {
//     // 单一设置：setCss
//     // arg=[outer, 'width', 500]
//     // setCss(outer, 'width', 500)
//     // setCss.apply(null, arg)
//     setCss(...arg)
//     return
//   }
//   if (len === 2 && typeof arg[1] === 'object' && arg[1] !== null) {
//     // 传递两个参数，第二个参数是一个对象(不是null)，说明想要操作的是批量设置
//     setGroupCss(...arg)
//     return
//   }
//   // 剩下的代表获取样式
//   return getCss(...arg)
// }
let css = function (...arg) {
  let len = arg.length,
    fn = getCss
  len >= 3 ? fn = setCss : null
  len === 2 && (arg[1] instanceof Object) ? fn = setGroupCss : null
  return fn(...arg)
}

/**
 * for-in 循环
 *  遍历一个对象中的键值对，有多少组键值对，就遍历多少次
 */
let obj = {name: 'xxx', age: 27, 0: 0, sex: 0, score: 100, 1: 1}
// for (let key in obj) {
//   console.log(key) // key存储的是每一次循环获取的属性名
//   console.log(obj[key]) // 每次循环基于key获取属性值
// }
// =>FOR-IN遍历的时候有自己的顺序：先遍历数字属性名（按照小->大），再遍历字符串属性名（按照书写顺序）
// for (let attr in obj) {
//   console.log(attr) // 0 1 name age sex score
// }
// obj.__proto__ === Object.prototype：obj是Object这个类的实例
// 大括号中的是obj的私有属性，Object.prototype上的是obj公有属性
Object.prototype.bbbb = 1000
for (let key in obj) {
  // for-in循环只遍历当前对象的可枚举（可遍历）的属性
  // 1.对象的私有属性（自己写的）是可枚举的
  // 2.浏览器内置的属性一般是不可枚举的
  // 3.自己在类的原型上设置的属性也是可枚举的，for-in循环时也会被遍历出来（一般情况下我们是不想遍历到原型上的共有属性的）
  // console.log(key) // 0 1 name age sex score bbbb 
  if (obj.hasOwnProperty(key)) {
    console.log(key) // 0 1 name age sex score
  }
}