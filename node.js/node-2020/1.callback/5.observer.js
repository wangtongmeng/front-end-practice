// 观察者模式 被观察者模式

// 将所有的观察者都放到被观察者中（基于发布订阅的）

class Subject { // 被观察者
    constructor(name) {
        this.name = name
        this.observers = []
        this.state = '玩呢'
    }
    attach(o){ // 被观察者中要存放所有的观察者
        this.observers.push(o)
    }
    setState(newState) {
        if (this.state !== newState) {
            this.state = newState
            this.observers.forEach(o => o.update(this))\
        }
    }
}

class Observer { // 观察者
    constructor(name) {
        this.name = name
    }
    update(baby){
        console.log(baby.name + '跟' + this.name + '说：' + baby.state)
    }
}

// 小宝宝 state => 主动的通知
let baby = new Subject('小宝宝')
let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')
baby.attach(o1)
baby.attach(o2) 

baby.setState('有人打我')
baby.setState('我打他们')

// 发布订阅：订阅和发布没有关系，中介自己订阅自己发布
// 观察者模式：订阅和发布有关系，把订阅的对象都放到被观察者中去了，当状态发生变化后，会主动通知观察者（没有emit过程，相当于自动触发了）

// vue的依赖收集就是观察者模式 vue的组件通信/redux是发布订阅