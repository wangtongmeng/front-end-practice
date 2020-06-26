let express = require('express')
let app = express()
app.get('/user', function(req,res){
  console.log(req.headers)
  res.json({
    name: 'zhangsan'
  })
})
app.listen(6000, () => {
  console.log('启动服务 port 6000')
})