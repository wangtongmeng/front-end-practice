import { config } from '../config.js'

// request 函数代码已经很多，应该在进行拆分
const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          // 回调函数传递
          params.success(res.data)
        } else {
          // 服务器异常
          // 根据文档，模拟 4xx 的错误情况
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        // api 调用失败
        // 断网后，可看到效果
        this._show_error(1)
      }
    })
  }

  // es6 没有提供私有函数的标准，这里通过下划线表示私有函数，只在函数内调用（自定义的私有函数可以再外部调用，不过不要这样做）
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP }