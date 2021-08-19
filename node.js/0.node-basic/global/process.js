
/* process.platform */
// console.log(process.platform) // win32

/* process.env */
// 命令行执行 set NODE_ENV=development
//  node 1.js

// if (process.env.NODE_ENV === 'development') {
//     console.log('dev');
// } else {
//     console.log('prod'); // prod
// }

/* process.argv */
// let argv = process.argv.slice(2).reduce((memo, current, index, arr) => {
//     if (current.startsWith('--')) {
//         memo[current.slice(2)] = arr[index + 1]
//     }
//     return memo
// }, {})
// // 命令行执行 node process.js --port 3000 --info abc
// console.log(argv); // { port: '3000', info: 'abc' }


/* process.nextTick */
Promise.resolve().then(()=>{
    console.log('promise');
})
process.nextTick(()=>{ // 当前执行栈的底部
    console.log('nextTick');
})
// nextTick promise
