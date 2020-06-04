/*eslint-disable*/
// 存放懒加载功能的文件
export default (Vue) => {
  class ReactiveListener {
    constructor(el, src, elRenderer, options) {
      this.el = el
      this.src = src
      this.elRenderer = elRenderer
      this.options = options
    }

  }
  return class LazyClass {
    constructor(options) {
      this.options = options // 将用户传入的数据保存到当前的实例上
      this.listenerQueue = []
      this.lazyLoadHandler = () => {
        console.log('scroll')
      }
    }
    add(el, bindings, vnode) {
      // 需要监控父亲的滚动事件，当滚动时 检测当前的图片是否出现在了 可是区域内
      // addEventListener('scroll') 监控当前图片是否在显示区域的范围

      // 这里获取不到真实的dom
      Vue.nextTick(() => {
        function scrollParent() {
          let parent = el.parentNode
          while (parent) {
            if (/scroll/.test(getComputedStyle(parent)['overflow'])) {
              return parent
            }
            parent = parent.parentNode // 不停的向上找 找到带有overflow的属性
          }
          return parent
        }
        let parent = scrollParent()
        let listener = new ReactiveListener({
          el, // 真实dom
          src,
          elRenderer: this.elRenderer.bind(this),
          options: this.options // 默认会看渲染loading
        })
        this.listenerQueue.push(listener)
        parent.addEventListener('scroll', this.lazyLoadHandler) // 滚动式判断
        // 默认需要先进行一次判断
      })
    }
    elRenderer(listener, state) { // 渲染当前实例什么状态
      let {
        el
      } = listener
      let src = ''
      switch (state) {
        case 'loading':
          src = listener.options.loading || ''
          break;
        case 'error':
          src = listener.options.error || ''
        default:
          src = listener.src
          break;
      }
      el.setAttribute('src', src )
    }
  }
}