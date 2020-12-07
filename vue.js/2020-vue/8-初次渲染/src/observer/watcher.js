class Watcher {
    constructor (vm, exprOrFn, callback, options) {
        this.vm = vm
        this.exprOrFn = exprOrFn
        this.options = options

        this.getter = exprOrFn // 将内部传过来的回调函数 放到getter属性上

        this.get()
    }
    get(){
        this.getter()
    }
}

export default Watcher