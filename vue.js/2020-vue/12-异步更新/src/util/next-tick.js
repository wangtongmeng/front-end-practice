let callbacks = []
// [flushSchedularQueue,userNextTick]

let waiting  = false
function flushCallback() {
    callbacks.forEach(cb=>cb())
    waiting = false
    callbacks = []
}
export function nextTick(cb) {
    // 多次调用nextTick 如果没有刷新的时候 就先把他放到数组中，
    // 刷新后 更改waiting
    callbacks.push(cb)
    if (waiting === false) {
        setTimeout(flushCallback, 0)
        waiting = true
    }
}