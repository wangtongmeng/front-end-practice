setImmediate(() => { // 这个最好
  console.log('setImmediate');
  
})

setTimeout(() => {
  console.log('timeout');
  
}, 0)

process.nextTick(() => {
  console.log('nextTick');
  
})
// 结果
// nextTick
// timeout
// setImmediate

// process.nextTick 比 setImmediate 执行的早
// nextTick 把 function 插入到当前队列的最后一个
// setImmediate 把 function 插入到下一个队列的队首
// setTimeout 在中间

// process.nextTick(() => {
//   console.log('nextTick');
//   process.nextTick(() => {
//     console.log('nextTick');
    
//   })
// })

// nextTick 循环调用，调至后续异步调用没办法执行