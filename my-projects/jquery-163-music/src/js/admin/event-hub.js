window.eventHub = {
    events: {
        // 'xxx':[fn],
        // 'yyy':[]
    },
    emit(eventName, data) { // 发布
        for (let key in this.events) {
            if(key === eventName) {
                let fnList = this.events[key]
                fnList.map((fn)=>{
                    fn.call(undefined, data)
                })
            }
        }
    },
    on(eventName, fn) {  // 订阅
        if(this.events[eventName] === undefined) {
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    }
}