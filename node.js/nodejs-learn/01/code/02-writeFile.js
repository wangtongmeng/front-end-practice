var fs = require('fs')
fs.writeFile('./data/hello.txt', '大家好房', (error) => {
  if (error) {
    console.log('写入失败');
  } else {
    console.log('写入成功');
  }
})