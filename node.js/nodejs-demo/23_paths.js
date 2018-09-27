const path = require('path')
const mod = require('./02_cusmod')
console.log(mod.testVar);

console.log('_dirname', __dirname);
console.log('process.cwd()', process.cwd());
console.log('./', path.resolve('./'));
// 和 pwd 一样

