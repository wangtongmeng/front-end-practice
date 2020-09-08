class Sub {
  constructor(){
    // 创建事件池
    this.pond = {}
  }
  $on(type, func){
    if(!this.pond.hasOwnProperty(type)) {
      this.pond[type] = []
    }
    let pond = this.pond[type]
    if (pond.includes(func)) return
    pond.push(func)
  }
  // 通知事件池中的方法依次执行
  $emit(type, ...args){
    let pond = this.pond[type] || []
    pond.forEach(item => {
      if (typeof item !== 'function') return
      item(...args)
    })


  }
}

export default function subscribe() {
  return new Sub()
}

/**
 * $on('AAA', func1)
 * $ON('AAA', func2)
 * $emit('AAA', 10, 20 )
 */