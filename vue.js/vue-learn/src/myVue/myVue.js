// new MyVue({
//   data: {
//     msg: 'hello'
//   }
// })

class MyVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    // 响应化
    this.observe(this.$data)
  }
  // 递归遍历，使传递进来的对象响应化
  observe(value) {
    if (!value || typeof value !== 'object') {
      return 
    }

    // 遍历
    Object.keys(value).forEach(key => {
      // 对key做响应式处理
      this.defineReactive(value, key, value[key])
      this.proxyData(key)
    })
  }

  // 在vue根上定义属性代理data中的数据
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }

  defineReactive(obj, key, val) {

    // 递归
    this.observe(val)
    // 给obj定义属性
    Object.defineProperty(obj, key, {
        get() {
          return val
        },
        set(newVal) {
          if (newVal !== val) {
            val = newVal
            console.log(`${key}属性更新了`)
          }
        }
    })
  }
} 