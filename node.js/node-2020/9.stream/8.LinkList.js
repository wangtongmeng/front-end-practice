// 常见的数据结构 队列 栈 链表 树
// 队列 先进先出 对应数组的push shift 例如：事件环
// 栈 先进后出 对应数组的push pop 例如：方法调用栈、路由切换、浏览器的历史记录(两个栈)



// 链表查找 删除的性能平均复杂度是O(n) 链表可以优化头尾操作比较合适  使用链表来实现 栈或者队列


// 函数声明时定了作用域 运行时产生执行上下文

class Node {
    constructor(element, next) {
        this.element = element
        this.next = next
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.size = 0
    }
    // 增加节点
    add(index,element) {
        if (arguments.length == 1) {
            element = index
            index = this.size
        }

        if (index < 0 || index > this.size) throw new Error('链表索引异常')


        this.size++
    }
    // 删除节点
    remove() {}
    // 获取节点
    getNode() {}
    // 链表的总个数
    size() {}
}
let ll = new LinkedList()
ll.add(0, 100)
ll.add(0, 200)
ll.add(300) // 200 100 300