let id = 0
class Dep {
    constructor() {
        this.id = id++
        this.subs = [] // age: [watcher, watcher]
    }
    addSub(watcher) {
        this.subs.push(watcher) // 观察者模式
    }
    depend() {
        // 让这个watcher 记住当前的dep，如果watcher没存过Dep，dep肯定不能存watcher
        Dep.target.addDep(this)
    }
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}

let stack = []
// 目前可以做到 将watcher保留起来 和 移除的功能
export function pushTarget(watcher) {
    Dep.target = watcher
    stack.push(watcher)
}

export function popTarget(watcher) {
    stack.pop()
    Dep.target = stack[stack.length - 1]
}

export default Dep