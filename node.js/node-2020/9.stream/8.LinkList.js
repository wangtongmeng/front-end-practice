/**
 * 实现链表
 * 链表反转
 */

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
    add(index, element) {
        if (arguments.length == 1) {
            element = index
            index = this.size
        }

        if (index < 0 || index > this.size) throw new Error('链表索引异常')

        if (index == 0) {
            let head = this.head // 老的头
            this.head = new Node(element, head)
        } else {
            let preNode = this.getNode(index - 1) // 这里前面节点肯定有，如果没有会走if
            preNode.next = new Node(element, preNode.next)
        }


        this.size++
    }
    // 删除节点
    remove(index) {
        if (this.size == 0) return null
        let oldNode
        if (index == 0) {
            oldNode = this.head
            this.head = oldNode && oldNode.next
        } else {
            let preNode = this.getNode(index-1) // 获取目标的前一个节点
            oldNode = preNode.next // 保存目标节点
            preNode.next = preNode.next.next // 让目标的前一个节点next指向目标的next
        }
        this.size--
        return oldNode.element // 返回删除节点元素
    }
    // 获取节点
    getNode(index) {
        let current = this.head // 从头找
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }
    // 链表的总个数
    length() {
        return this.size
    }
    // 链表反转 递归的方式 两两反转
    reverseLinkedList(){
        function reverse(head) {
            if (head == null || head.next == null) return head
            // 先递归里面的再出来
            let newHead = reverse(head.next) // 将下一个节点 作为头节点
            head.next.next = head // 将新头的next 指向 head
            head.next = null // 将老头的next 指向空
            return newHead
        }
        this.head = reverse(this.head)
        return this.head
    }
    // 通过循环实现 创建一个新的链表
    reverseLinkedList2(){
        let head = this.head // 保留老头
        if (head == null || head.next == null) return head
        

        let newHead = null // 新的链表头部默认指向null
        while(head!==null){ // 循环老的链表 将内容依次的取出使用
            let secondNode = head.next // 头的下一个
            head.next = newHead // 让老的头指向新的头
            newHead = head // 这时新链表头有节点了 更新新链表的头
            head = secondNode // 让老链表的第二个node节点变为头
        }
        this.head = newHead
        return this.head
    }
}
// let ll = new LinkedList()
// ll.add(0, 100)
// ll.add(0, 200)
// ll.add(300) // 200 100 300
// console.log(ll.head)
// let reverseList = ll.reverseLinkedList()
// console.log(reverseList)
// let reverseList2 = ll.reverseLinkedList2()
// console.log(reverseList2)
// console.log(ll.head)
// console.log('remove', ll.remove(0))


module.exports = LinkedList