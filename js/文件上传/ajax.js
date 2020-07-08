function $ajax(options) {
  options = Object.assign({
    url: '',
    method: 'post',
    data: null,
    headers: {}
  }, options)
  return new Promise((resolve, reject) => {
    let xhr = new XMlHttpRequest
    xhr.open(options.method, options.url)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (/^(2|3)d{2}$/.test(xhr.status)) {
          resolve(JSON.parse(xhr.responseText))
          return
        }
        reject(xhr)
      }
    }
    xhr.send(options.data)
  })
}