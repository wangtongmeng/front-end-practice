import axios from 'axios'

/**
 * 根据环境变量区分接口的默认地址
 */
switch (process.env.NODE_ENV) {
  case "production":
    axios.defaults.baseURL = "http://api.some.cn"
    break
  case "test":
    axios.defaults.baseURL = "http://192.168.20.16:8080"
    break
  default:
    axios.defaults.baseURL = "http://127.0.0.1:3000"
}
/**
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true // 设置CORS跨域允许携带资源凭证
/**
 * 设置POST请求头：告知服务器请求主体的数据格式（看服务器要求什么格式，json或x-www-form-urlencoded，后者居多）
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded' // xxx=xxx&xxx=xxx 和get请求参数一致，这种格式就叫做x-www-form-urlencoded格式，很多服务器接收post请求都要求是这种格式
axios.defaults.transformRequest = data => qs.stringify(data) // 只对post请求有效
/**
 * 设置请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token检验（jwt）：接收服务器返回的token，存储到vuex/本地存储中，每一次向服务器发请求，我们应该把token带上
 */
axios.interceptors.request.use(config => {
  // 携带上token
  let token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
  return config
}, error => {
  return Promise.reject(error)
})
/**
 * 响应拦截器
 * 服务器返回信息 -> [拦截的统一处理] -> 客户端JS获取到信息
 */

// 对于接口的处理中，会少会出现3开头的情况。3开头的情况一般会出现在资源处理中，如页面重定向、文件的协商缓存等
// axios.defaults.validateStatus = status => {
//   // 自定义响应成功的HTTP状态码
//   return /^(2|3)\d{2}$/.test(status) // 200-300都走成功的回调
// }

axios.interceptors.response.use(response => {
  // 默认是2开头的走成功回调，其他的走失败回调
  // 只返回响应主体中的信息（部分公司根据需求进一步完善，例如指定服务器返回的code值来指定成功和失败）
  return response.data
}, error => {
  let { response } = error
  if (response) {
    // 服务器返回结果了
    // 请求已发送，只不过状态码不是200系列，设置不同状态码的不同处理
    switch (response.status) {
      // 具体根据实际情况而定
      case 401: // 当前请求需要用户验证（一般是未登录）
        break
      case 403: // 服务器已经理解请求，但是拒绝执行它（一般是token过期）
        localStorage.removeItem('token')
        // 跳转到登录页
        break
      case 404: // 请求失败，请求所希望得到的资源为被服务器上发现
        break
    }
    return Promise.reject(response)
  } else {
    // 服务器连结果都没有返回
    if (!window.navigator.onLine) {
      // 断网处理：可以跳转到断网页面
      return
    }
    return Promise.reject(error)
  }
})

export default axios