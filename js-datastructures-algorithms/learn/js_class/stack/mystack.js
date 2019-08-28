function Stack() {
  var items = [] // 存储数据
  
  // 从栈顶添加元素，也叫压栈
  this.push = function(item) {
    item.push(item)
  }
  
  // 弹出栈顶元素
  this.pop = function() {
    return items.pop()
  }
  
  // 返回栈顶元素
  this.top = function() {
    return items[items.length - 1]
  }
  
  // 判断栈是否为空
  this.Empty = function() {
    return items.length === 0
  }
  
  // 返回栈的大小
  this.size = function() {
    return items.length
  }
  
  // 清空栈
  this.clear = function() {
    items = []
  }
}