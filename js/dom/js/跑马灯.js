/**
 * 实现JS动画
 *  让wrapper每隔一段时间（最优动画时间是13~17ms）在原有的left基础上减去步长（想让动画快一些，步长就长一点）
 */

let wrapper = document.querySelector('.wrapper')
// 1.把wrapper中原有的li整体克隆一份放到容器的末尾（无缝轮播），响应修改wrapper的宽度（内容变多了）

// let wrapperList = wrapper.querySelectorAll('li')
// let frg = document.createDocumentFragment()
// // [].forEach.call(wrapperList, item => { // 不知道为啥不行
// Array.prototype.forEach.call(wrapperList, item => {
//   frg.appendChild(item.cloneNode(true))
// })
// wrapper.appendChild(frg)
// frg = null
wrapper.innerHTML += wrapper.innerHTML
utils.css(wrapper, 'width', utils.css(wrapper, 'width') * 2)

// 2.基于定时器实现动画
setInterval(() => {
  // 获取当前wrapper的left值，减去步长，把最新的left赋值给元素即可
  let curL = utils.css(wrapper, 'left')
  curL -= 2
  utils.css(wrapper, {
    left: curL
  })

  // 实现无缝轮播：当我们ul距离marquee-box的左偏移是整个wrapper的一般宽度时（第一组原始内容已经运行完成，现在看到的是克隆后的），此时我们让wrapper立即运动到left为零的位置即可
  if (Math.abs(wrapper.offsetLeft) >= utils.css(wrapper, 'width') / 2) {
    utils.css(wrapper, 'left', 0) // 立即回到起始的位置
  }
}, 17)
