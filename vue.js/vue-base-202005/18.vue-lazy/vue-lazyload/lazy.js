/*eslint-disable*/
// 存放懒加载功能的文件
export default (Vue) => {
  return class LazyClass {
    constructor(options) {
      this.options = options // 将用户传入的数据保存到当前的实例上
    }
    add(el,bindings,vnode){
      // 需要监控父亲的滚动事件，当滚动时 检测当前的图片是否出现在了 可是区域内
      // addEventListener('scroll') 监控当前图片是否在显示区域的范围

      // 这里获取不到真实的dom
      Vue.nextTick(() => {
        function scrollParent(){
          let parent = el.parentNode
          while(parent){
            if(/scroll/.test(getComputedStyle(parent)['overflow'])){
              return parent
            }
            parent = parent.parentNode // 不停的向上找 找到带有overflow的属性
          }
          return parent
        }
        let parent = scrollParent()
        console.log(parent)
      })
    }
  }
}