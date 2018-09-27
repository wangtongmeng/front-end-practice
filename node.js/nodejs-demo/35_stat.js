const fs = require('fs')

fs.stat('./35_stat.js', (err, stats) => {
  if (err) throw err

  console.log(stats.isFile());
  console.log(stats.isDirectory());

  console.log(stats); 
})

// 文件是否存在
fs.stat('./35_stat.jss', (err, stats) => {
  if (err) {
    console.log('文件不存在');
    return
  }

  console.log(stats.isFile());
  console.log(stats.isDirectory());

  console.log(stats); 
})