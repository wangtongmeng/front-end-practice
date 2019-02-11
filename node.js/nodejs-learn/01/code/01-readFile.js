var fs = require('fs')
fs.readFile('./data/a.txt', (error, data) => {
  // console.log(data.toString());
  if (error) {
    console.log('读取文件失败')
    return
  }
  console.log(data.toString())

})