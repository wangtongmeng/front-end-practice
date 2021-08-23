// 回调函数的方式  callback setTimeout / fs.readFile .... 回调地狱
// promise 只是优化了一下 并没有完全结果
// generator 可以把函数的执行权交出去 * / yield
// async + await 基于generator的  语法糖

const util = require('util')
const fs = require('fs')
let readFile = util.promisify(fs.readFile)

async function read() {
    let data = await readFile('./a.txt', 'utf8');
    data = await readFile(data, 'utf8');
    let r = await 1000
    return r;
}

read().then(data=>{
    console.log(data); // 1000
})