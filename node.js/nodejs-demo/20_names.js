const {basename, dirname, extname} = require('path')

const filePath = '/usr/local/bin/no.txt'

console.log(basename(filePath)); // 文件名
console.log(dirname(filePath)); // 所在文件夹
console.log(extname(filePath)); // 拓展名
// no.txt
// /usr/local/bin
// .txt

