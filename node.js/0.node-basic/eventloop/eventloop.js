// setTimeout(() => {
//     console.log('timeout')
// }, 0);
// setImmediate(()=>{
//     console.log('setImmediate')
// })
// 不一定

// const fs = require('fs')
// fs.readFile('./note.md', 'utf8', () => {
//     setTimeout(() => {
//         console.log('timeout');
//     }, 0);
//     setImmediate(() => {
//         console.log('immediate');
//     })
// })
// io操作属于poll中的回调，执行完毕后检测setImmediate队列是否为空，有执行，然后在执行timers队列
// immediate => timeout




// node的事件轮询机制与浏览器一致
setTimeout(() => {
    console.log('timeout1')
}, 0);
Promise.resolve().then(()=>{
    console.log('then')
}) // then => temout1