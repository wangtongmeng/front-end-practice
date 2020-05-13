import qs from 'qs'
/**
 * 根据环境变量进行接口区分
 */
let baseURL = ''
let baseURLArr = [{
  type: 'deveplopment',
  url: 'http://127.0.0.1:3000'
}, {
  type: 'test',
  url: 'http://192.168.20.16:8080'
}, {
  type: 'production',
  url: 'http://api.some.cn'
}]
baseURLArr.forEach(item => {
  if (process.env.NODE_ENV === item.type) {
    baseURL = item.url
  }
})

export default function request(url, options = {}) {
  url = baseURL + url
  /**
   * get系列请求的处理
   */
  !options.method ? options.method = 'GET': null
  if (options.hasOwnProperty('params')) {
    if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method)) {
      const ask = url.include('?') ? '&' : '?'
      url += `${ask}${qs.stringify(params)}`
    }
    delete options.params
  }
  /**
   * 合并配置项
   */
  options = Object.assign({
    // 允许跨域携带资源凭证 fetch中credentials有三个值： same-origin同源可以 omit 拒绝 include 不管同源还是跨域都可以携带凭证
    credentials: 'include',
    headers: {}
  }, options)
  options.headers.Accept = 'application/json'

  /**
   * token的校验
   */
  const token = localStorage.getItem('token')
  token && (options.headers.Authorization = token)

  /**
   * post请求的处理
   */
  if (/^(POST|PUT)$/i.test(options.method)) {
    !options.type ? options.type = 'urlencoded' : null
    if (options.type === 'urlencoded') {
      
    }
  }
} 