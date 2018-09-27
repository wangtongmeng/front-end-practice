const fs = require('fs')

fs.watch('./', {
  recursive: true // 递归
}, (eventType, filename) => {
  console.log(eventType, filename);
})
// fs.watchFile