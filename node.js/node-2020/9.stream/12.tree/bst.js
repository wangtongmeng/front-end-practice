// 树的常用概念
// bst binary search tree 二叉搜索树的实现

class Node { // 节点必须有一个parent
    constructor(element, parent) {
        this.element = element
        this.parent = parent
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
        this.size = 0
    }
    add(element) {
        if (this.root == null) {
            this.root = new Node(element, null)
            this.size++
            return
        }
        // 根据根来比较插入
        // 根据条件不停的找 找到节点为空时 将上一次的值保存起来。将节点插入到保存的节点中
        let currentNode = this.root // 从根开始进行查找
        let parent = null // parent是进入左右子树之前的节点
        let compare = null
        while (currentNode) {
            compare = element - currentNode.element
            parent = currentNode
            if (compare > 0) {
                currentNode = currentNode.right
            } else if (compare < 0) {
                currentNode = currentNode.left
            }
        }
        let newNode = new Node(element, parent)
        if (compare > 0) {
            parent.right = newNode
        } else {
            parent.left = newNode
        }
        this.size++
    }
    preOrderTraversal(){}
    inOrderTraversal(){}
    postOrderTraversal(){}
}

let bst = new BST()
let arr = [10, 8, 19, 6, 15, 22, 20]
arr.forEach(item => {
    bst.add(item)
})

console.dir(bst, {
    depth: 10
})
// 二叉搜索树中的内容必须是有可比较性的



// 常用的遍历方式 前序、中序、后序、层序遍历