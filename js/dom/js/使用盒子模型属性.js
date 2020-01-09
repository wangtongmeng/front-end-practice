// 这里的css是模仿 JQ类库中的CSS
// utils.css(outer, {
//   width: 400,
//   height: 300,
//   color: 'red',
//   background: 'lightblue'
// })
// console.log(utils.css(outer, 'padding'))

/*
 * offsetParent：当前盒子的父级参照物
 * offsetTop / offsetLeft：获取当前盒子距离其父级参照物的偏移量(上偏移/左偏移)  当前盒子的外边框开始~父级参照物的内边框
 */
//=>“参照物”：同一个平面中，元素的父级参照物和结构没有必然联系，默认他们的父级参照物都是body（当前平面最外层的盒子） body的父级参照物是null
// console.log(center.offsetParent) // body
// console.log(inner.offsetParent)  // body
// console.log(outer.offsetParent)  // body
//=>“参照物可以改变”：构建出不同的平面即可（使用zIndex，但是这个属性只对定位有作用），所以改变元素的定位(position:relative/absolute/fixed)可以改变其父级参照物
// utils.css(outer, {
//   position: 'relative' //=>把outer脱离原有的平面，独立出一个新的平面，后代元素的父级参照物都会以它为参考
// });
// console.log(center.offsetParent); // outer
// console.log(inner.offsetParent);  // outer
// console.log(outer.offsetParent);  // body
// utils.css(inner, {position: 'absolute'})
// console.log(center.offsetParent);       // inner
// console.log(inner.offsetParent);        // outer
// console.log(outer.offsetParent);        // body
// console.log(document.body.offsetParent);// null

//===================(不知道有啥用)
// utils.css(outer, {
//     position: 'relative'
// });
// utils.css(inner, {
//     position: 'absolute',
//     top: 20,
//     left: 20
// });

//=>不管你的父级参照物是谁，我都要获取当前元素距离BODY的偏移量（左偏移和上偏移）
//1.不能修改既定的样式(不能基于POSITION方式改它的参照物了)

/*
 * scrollTop / scrollLeft：滚动条卷去的宽度或者高度
 *
 *   最小卷去值：0
 *   最大卷去值：真实页面的高度 - 一屏幕的高度   document.documentElement.scrollHeight-document.documentElement.clientHeight
 *
 *   在JS盒子模型13个属性中，只有scrollTop/scrollLeft是“可读写”属性，其余都是“只读”属性
 *
 *   操作浏览器的盒子模型属性，我们一般都要写两套，用来兼容各种模式下的浏览器
 */
console.log(utils.winHandle('scrollTop'));