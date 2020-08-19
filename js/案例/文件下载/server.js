const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('hello world')
})
app.get('/downloadFile', (req,res)=>{
  let { id } = req.query
  var fileStream = fs.createReadStream('./dog2.jpg')
  res.setHeader('Content-type', 'application/octet-stream')
  res.setHeader('Content-Disposition', `attachment;filename=${id}.jpg`)
  fileStream.on('data', function (data) {
      res.write(data, 'binary')
  })
  fileStream.on('end', function () {
      res.end()
      console.log('The file has been downloaded successfully!')
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))