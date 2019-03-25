import { config } from '../config.js'

// request 函数代码已经很多，应该在进行拆分
const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  request({url, data={}, method='GET'}){
    return new Promise((resolve, reject)=>{
        this._request(url, resolve, reject, data, method)
    })
  }

  _request(url,resolve, reject, data={}, method='GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          // 回调函数传递
          // 利用 && 判断是否传入了 success 回调函数
          resolve(res.data)
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  // es6 没有提供私有函数的标准，这里通过下划线表示私有函数，只在函数内调用（自定义的私有函数可以再外部调用，不过不要这样做）
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP }