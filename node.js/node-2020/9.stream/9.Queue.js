/**
 *基于链表实现队列
 */

// 基于链表实现队列
let LinkedList = require('./8.LinkList')

class Queue { // 队列的添加和删除
    constructor(){
        this.ll = new LinkedList()
    }
    offer(element){ // 入队
        this.ll.add(element)
    }
    poll(){ // 出队
        return this.ll.remove(0)
    }
}

module.exports = Queue

// 链表反转 其他的两个流 转化流和双工流
// 文件夹操作 树结构遍历算法 层序 深度 树的反转