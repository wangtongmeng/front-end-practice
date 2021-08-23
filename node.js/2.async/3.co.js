/* 期望yield的返回值就是yield后表达式的结果 */
// function* read() { // 生成器 他执行的结果叫迭代器
//     var a = yield 1;
//     console.log(a);
//     var b = yield 2;
//     console.log(b);
//     var c = yield 3;
//     console.log(c);
// }
// let it = read();
// let value,done;
// do{
//     let {value:v,done:d} = it.next(value);
//     value = v;
//     done = d;
// }while(!done)
// 1 2 3


/* co库实现 */
const util = require('util')
const fs = require('fs')
let readFile = util.promisify(fs.readFile)
// TJ co
// const co = require('co');
function co(it) {
    return new Promise((resolve, reject) => {
        // 异步的迭代  只能用递归的方法
        function next(data) {
            let { value, done } = it.next(data);
            if (done) { // 如果执行完毕则 完成
                resolve(value);
            } else {
                // 原生的promise 有优化 如果是promise 内部会直接把promise返回
                Promise.resolve(value).then(next, reject)
            }
        }
        next();
    })
}

function* read() {
    let data = yield readFile('./a.txt', 'utf8')
    data = yield readFile(data, 'utf8')
    return data
}
co(read()).then(data => {
    console.log(data); // b.txt
}).catch(err => {
    console.log(err);
})