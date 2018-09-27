// 操作系统相关

const {
  sep, // 路径的分隔符
  delimiter, // path 的分隔符
  win32,
  posix
} = require('path')

console.log('sep: ', sep);
console.log('posix sep', posix.sep);

console.log('PATH', process.env.PATH);

console.log('delimiter ', delimiter);
console.log('posix delimiter', posix.delimiter);

