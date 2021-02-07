// 树的常用概念
// bst binary search tree 二叉搜索树的实现
//  前序、中序、后序、层序遍历
// 二叉树的反转
// 文件夹的操作

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
    preOrderTraversal(visitor) {
        const traversal = (node) => {
            if (node == null) return
            visitor.visit(node)
            traversal(node.left)
            traversal(node.right)
        }
        traversal(this.root)
    }
    inOrderTraversal(visitor) {
        const traversal = (node) => {
            if (node == null) return
            traversal(node.left)
            visitor.visit(node)
            traversal(node.right)
        }
        traversal(this.root)
    }
    // 根据parent属性 一般情况下 都可以用栈型结构 去避免递归
    postOrderTraversal(visitor) {
        const traversal = (node) => {
            if (node == null) return
            traversal(node.left)
            traversal(node.right)
            visitor.visit(node)
        }
        traversal(this.root)
    }
    levelOrderTraversal(visitor) {
        if (this.root == null) return

        let stack = [this.root]
        let index = 0
        let currentNode = null
        while (currentNode = stack[index++]) {
            visitor.visit(currentNode)
            if (currentNode.left) {
                stack.push(currentNode.left)
            }
            if (currentNode.right) {
                stack.push(currentNode.right)
            }
        }
    }
    // 二叉树的反转 左右互换
    invertTree(){
        if (this.root == null) return

        let stack = [this.root]
        let index = 0
        let currentNode = null
        while (currentNode = stack[index++]) {

            let temp = currentNode.left
            currentNode.left = currentNode.right
            currentNode.right = temp

            if (currentNode.left) {
                stack.push(currentNode.left)
            }
            if (currentNode.right) {
                stack.push(currentNode.right)
            }
        } 
    }
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

// 访问者模式  babel 内部转化都是使用这种方式
// bst.preOrderTraversal({
//     visit(node) {
//         console.log(node.element)
//     }
// })


// bst.levelOrderTraversal({
//     visit(node) {
//         console.log(node.element)
//     }
// })


bst.invertTree()

console.log(bst.root)