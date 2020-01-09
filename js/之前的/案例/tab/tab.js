var tabBox = document.getElementById('tabBox')
var tabList = tabBox.getElementsByTagName('div')
var navBox = document.getElementById('navBox')
var navList = navBox.getElementsByTagName('li')
/*解决方法一：自定义属性解决方法（自定义属性思想大量应用于工作中）*/
// 循环三个li，给每一个li都绑定事件
for (var i = 0; i < navList.length; i++) {
  // navList[i]：当前循环下我们操作的那个li（i变量存储的值是我们需要获取指定元素的索引）
  // 在循环给每个li绑定点击事件时，我们给每个li(元素对象)设置一个自定义属性myIndex，属性值存储的是当前li的索引
  navList[i].myIndex = i
  navList[i].onclick = function () {
    // 需要点击li对应的索引，但是i不是
    // this是当前点击的这个元素li;this.myIndex获取的就是之前绑定在元素自定义属性上的索引值
    changeTab(this.myIndex)
  }
}

/*==========其他方式=========*/
// 闭包解决方案
// for (var i = 0; i < navList.length; i++) {
//   navList[i].onclick = (function (i) {
//     return function () {
//       changeTab(i)
//     }
//   })(i)
// }

// es6中的let解决方案
// for (let i = 0; i < navList.length; i++) {
//   navList[i].onclick = function () {
//       changeTab(i)
//     }
// }


//=========不行的
// for (var i = 0; i < navList.length; i++) {
//   navList[i].onclick = function () {
//     changeTab(i)
//   }
// }
/**
 * 只有JS代码加载完成才能看到页面，只有看到页面用户才能点击
 *  加载到循环 i=0 i<3 i++
 *  i=0 
 *    navList[0].myIndex=0
 *    navList[0].onclick = function () {...} 绑定事件时方法没有执行，点击第一个li时它才执行 i++ =>1
 *  i=1 
 *    navList[1].myIndex=1
 *    navList[1].onclick = function () {...} i++ =>2
 *  ...
 *  3<3 不通过，循环结束，i=3
 *  循环结束，JS全部加载完成后，用户才能看到页面
 *  
 *  循环结束看到页面，用户去点击某一个页卡，接下来开始执行绑定的方法，方法中遇到一个i，但是此时已经是循环结束后的3了
 */

// 封装一个函数实现选项卡的切换
// clickIndex:创建函数时还不知道点的是谁，所以定义一个入口clickIndex（存储点击这一项的索引），执行方法时把点击这一项的索引传递进来即可
function changeTab(clickIndex) {
  // 1.先让所有的li和div都没有选中的样式
  for (var i = 0; i < navList.length; i++) {
    navList[i].className = ''
    tabList[i].className = ''
  }
  // 2.点击的是谁就给谁加选中样式类
  navList[clickIndex].className = 'active'
  tabList[clickIndex].className = 'active'
}