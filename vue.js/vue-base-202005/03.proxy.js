// 如何用proxy来实现响应式原理
let obj = {
  name: {
    name: 'zhangsan'
  },
  arr: ['吃', '喝', '玩']
}
// 兼容性差 可以代理13种方法set get

// defineProperty只能对特定的属性进行拦截
let handler = {
  get(target, key) {
    console.log('收集依赖')
    if (typeof target[key] === 'object' && target[key] !== null) {
      // 递归代理 只有取到对应值时，才会进行代理。
      return new Proxy(target[key], handler)
    }
    // Reflect 反射 这个方法包含了很多的api
    return Reflect.get(target, key)
    // return target[key] 老写法
  },
  set(target, key, value) {
    // console.log('触发更新', key)
    let oldValue = target[key]
    if(!oldValue){ // length还需要特殊处理以下，后面再说
      console.log('新增属性')
    } else if (oldValue !== value) {
      console.log('修改属性')
    }
    // target[key] = value // 设置时 如果设置不成功，不会报错，例如将对象设置为不可配置
    return Reflect.set(target, key, value)
  }
}
let proxy = new Proxy(obj, handler)

// console.log(proxy.name)
// proxy.name = 123
// 安装扩展 Code Runner，右键可以直接运行文件

// 懒代理
// 对象
// proxy.name.name // 打印两次 收集依赖
// proxy.name.name = 123 // 先取值，再赋值 收集依赖 触发更新

// 数组
// proxy.arr.push(123) // 触发3此收集依赖，2次更新依赖。因为数组有3项，进行了3次取值。2次更新是先添加数组项，再改变数组长度导致的。
// proxy.arr[0]=100 // 修改
proxy.xxx = 100 // 新增


