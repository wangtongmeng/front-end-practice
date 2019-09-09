const http = require('http')
// const querystring = require('querystring')

// const server = http.createServer((req, res) => {
//   console.log('method: ', req.method)
//   const url = req.url
//   console.log('url: ', url)
//   req.query = querystring.parse(url.split('?')[1])
//   console.log('query: ', req.query)
//   res.end(
//     JSON.stringify(req.query)
//   )
// })
// server.listen(8000)
// console.log('server is running on 8000')

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // req 数据格式
    console.log('req content-type', req.headers['content-type'])
    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log('postData: ', postData)
      res.end('hello world!')
    })
  }
})

server.listen(8000)
console.log('server is running on 8000')