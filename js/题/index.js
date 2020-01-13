/**
 * 作用域 this
 */
// var point = {
//     x: 10,
//     y: 20,
//     moveTo: function (x, y) {
//         //=>this:point
//         //=>x:100 y:200

//         var moveX = function (x) {
//             //=>this:window
//             this.x = x;
//         }
//         var moveY = function (y) {
//             //=>this:window
//             this.y = y;
//         }
//         moveX(x);//=>moveX(100)
//         moveY(y);//=>moveY(200)
//     }
// };
// point.moveTo(100, 200);
// console.log(point.x, point.y);//=>10 & 20

// var point = {
//     x: 10,
//     y: 20,
//     moveTo: function (x, y) {
//         //=>this:point
//         //=>x:100 y:200
//         /**
//          * 使this指向point
//          *    1.利用call使this执行point
//          *    2.箭头函数使函数的this变为上下文中的this
//          *    3.使用变量_this存储父级作用域中的this
//          */
//         // 1.
//         // var moveX = function (x) {
//         //     //=>this:point
//         //     this.x = x;
//         // };
//         // var moveY = function (y) {
//         //     //=>this:point
//         //     this.y = y;
//         // };
//         // moveX.call(this,x);
//         // moveY.call(this,y);

//         // 2.
//         // var moveX = (x) => {
//         //     //=>this:point
//         //     this.x = x;
//         // };
//         // var moveY = (y) => {
//         //     //=>this:point
//         //     this.y = y;
//         // };
//         // moveX(x);
//         // moveY(y);
//         // 3.
//         var _this = this;
//         var moveX = function (x) {
//             //=>_this:point
//             _this.x = x;
//         };
//         var moveY = function (y) {
//             //=>_this:point
//             _this.y = y;
//         };
//         moveX(x);
//         moveY(y);
//     }
// };
// point.moveTo(100, 200);
// console.log(point.x, point.y);

/*
 * JS中的THIS汇总
 *   THIS:当前方法执行的主体(谁执行的这个方法,那么THIS就是谁,所以THIS和当前方法在哪创建的或者在哪执行的都没有必然的关系)
 */
//1.给元素的某个事件绑定方法，方法中的THIS都是当前操作的元素本身
// document.body.onclick = function () {
//     //=>this:body
// };

//2.函数执行，看函数前面是否有点，有的话，点前面是谁THIS就是谁，没有点，THIS是WINDOW（在JS的严格模式下，没有点THIS是UNDEFINED）
// let fn = function () {
//     console.log(this.name);
// };
// let obj = {
//     name: '哈哈',
//     fn: fn
// };
// fn();//=>this:window
// obj.fn();//=>this:obj

//3.构造函数执行，方法中的this一般都是当前类的实例
// let Fn = function () {
//     this.x = 100;//=>this:f
// };
// let f = new Fn;

//4.箭头函数中没有自己的THIS,THIS是上下文中的THIS
// let obj = {
//     fn: function () {
//         // this:obj
//         setTimeout(() => {
//             //this:obj
//         }, 1000);
//     }
// };
// obj.fn();

//5.在小括号表达式中，会影响THIS的指向
// let obj = {
//     fn: function () {
//         console.log(this);
//     }
// };
// obj.fn();//=>this:obj
// ;(12, obj.fn)();//=>this:window

//6.使用call/apply/bind可以改变this指向
// fn.call(obj);//=>this:obj
// fn.call(12);//=>this:12
// fn.call();//=>this:window 非严格模式下call/apply/bind第一个参数不写或者写null和undefined，this都是window，严格模式下写谁this就是谁，不写是undefined

/**
 * 作用域 & 作用域链 & 闭包
 */
// var n = 2;
// function a() {
//     var n = 3;
//     function b(m) {
//         alert(++n + m);
//     }
//     b(4); // 8
//     return b;
// }
// var c = a(5);
// c(6); // 11
// alert(n); // 2

/**
 * 类数组转数组 过滤filter
 */
// let $attr = (domID, name, value) => {
//   // 1.先获取当前页面中的所有标签
//   let tagList = document.getElementsByTagName('*')
//   // 2.在获取的所有标签中按照ID/name/value进行筛选
//   tagList = [].slice.call(tagList) // 把类数组转换为数组
//   // tagList = [...tagList] 基于ES6中的展开运算符，让tagList等于一个数组，数组中的每一项是把之前的类数组展开后得到的
//   tagList = tagList.filter(item => {
//     // item.name:只有表单元素这样才可以获取到值,普通元素需要基于getAttribute获取值
//     // return item.id === domID && item.getAttribute('name') === name && (item.innerHTML === value || item.value === value) //=>传统标签获取里面的内容不是基于value属性，而是基于innerHTML/innerText属性完成的
//     return item.id === domID && item.getAttribute(name) === value
//   })
//   return tagList
// }
// setTimeout(() => {
//   console.log($attr('hobbyBox', 'hobby', 'music'))
// }, 20)

/**
 * 数组去重
 */
// 1.对象键值对处理（推荐）
// Array.prototype.myUnique = function () {
//   // this:ary 我们要操作的数据，如果不想改变原数组，就需要克隆一份数组进行处理
//   let _this = [...this],
//     obj = {}
//   for (let i = 0; i < _this.length; i++) {
//     let item = _this[i];
//     if (typeof obj[item] !== 'undefined') {
//       // 当前迭代项在数组中已存在，从数组中去掉这一项
//       _this.splice(i, 1) // 后面项移位，消耗性能
//       _this[i] = _this[_this.length - 1]
//       _this.length--
//       i--
//       continue
//     }
//     obj[item] = true
//   }
//   obj = null
//   return _this
// }

// 双循环（不推荐）
// Array.prototype.myUnique = function () {
//   let _this = [...this]
//   for (let i = 0; i < _this.length; i++) {
//     let item = _this[i]
//     // 每一次迭代到item后，用后面的数组项和item进行比较（如果相同，就从数组中去掉）
//     for (let j = i + 1; j < _this.length; j++) {
//       if (item === _this[j]) {
//         // 删除索引为j的数组项
//         _this[j] = _this[_this.length - 1]
//         _this.length--
//         j--
//       }
//     }
//   }
//   return _this
// }

// 使用indexOf(不兼容IE6~8)
// Array.prototype.myUnique = function () {
//   let _this = [...this]
//   // 遍历数组，验证当前项在数组中是否存在（和当前项的后面项比较，存在则去掉当前项）
//   for (let i = 0; i < _this.length; i++) {
//     let item = _this[i];
//       nextAry = _this.slice(i + 1)
//       if (nextAry.indexOf(item) > -1) {
//         _this[i] = _this[_this.length - 1]
//         _this.length--
//         i--
//       }
//   }
//   return _this
// }

// 排序后相邻去除法
// 先把数组进行排序，验证当前项和后一项是否相同，如果不相同，说明没有重复，并把该项保存即可
// Array.prototype.myUnique = function () {
//   let _this = []
//     ary = this.slice(0).sort((a, b) => a - b)
//   for (let i = 0; i < ary.length; i++) {
//     let item = ary[i],
//       next = ary[i + 1]
//     if (item !== next) {
//       _this.push(item)
//     }
//   }
//   return _this
// }


// let ary = [1, 2, 3, 2, 3, 4, 3, 2, 2, 2, 2, 3, 4, 5, 6, 7, 4, 1, 3, 2];
// let uniqueAry = ary.myUnique();
// console.log(uniqueAry);

