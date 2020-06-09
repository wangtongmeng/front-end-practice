(function () {
  class EventBus {
    constructor() {
      // 创建一个事件池，{xxx:[],...}
      this.pond = {}
    }
    // 向事件池中追加方法
    $on(type, func) {
      // 每一次加方法时，首先看看事件池中是否存在这个类型，不存在就创建
      let pond = this.pond;
      !(type in pond) ? pond[type] = []: null
      // 增加方法（去重）
      let pondT = pond[type];
      !pondT.includes(func) ? pondT.push(func) : null;
    }
    // 从事件池中移除方法
    $off(type, func) {
      let pondT = this.pond[type];
      if (!pondT) return;
      for (let i = 0; i < pondT.length; i++) {
        let item = pondT[i];
        if (item === func) {
          // 移除掉（因为追加的时候去重了，所以删除一次就够了，不需要再向后找了）：为了防止数组塌陷，我们此处不使用 pondT.splice(i, 1) 删除，我们先给其赋值为null即可
          pondT[i] = null;
          return;
        }
      }
    }
    // 通知事件池中某个类型对应的方法依次执行
    $emit(type, ...args) {
      let pondT = this.pond[type] || [];
      for (let i = 0; i < pondT.length; i++) {
        let func = pondT[i];
        // 如果不是函数，从容器中移除掉
        if (typeof func !== 'function') {
          pondT.splice(i, 1);
          i--;
          continue;
        }
        func.apply(this, args);
      }
    }
  }
  window.EB = new EventBus()
})()