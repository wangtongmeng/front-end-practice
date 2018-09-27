const {join} = require('path')

console.log(join('/usr', 'local', 'bin/'));
console.log(join('/usr', '../local', 'bin/')); // 也是用了 normalize

// join 用来拼接路径
