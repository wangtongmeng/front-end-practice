function Queue() {
  var items = [] // 存储数据
  
  // 向队列尾部添加一个元素
  this.enqueue = function(item) {
    items.push(item)
  }

  // 移除队列头部的元素
  this.dequeue = function() {
    return items.shift()
  }

  // 返回队列头部的元素
  this.head = function() {
    return items[0]
  }

  // 返回队列尾部的元素
  this.tail = function() {
    return items[items.length - 1]
  }

  // 返回队列大小
  this.size = function() {
    return items.length
  }

  // clear
  this.clear = function() {
    items = []
  }

  // isEmpty 判断是否为空队列
  this.isEmpty = function() {
    return items.length == 0
  }
}