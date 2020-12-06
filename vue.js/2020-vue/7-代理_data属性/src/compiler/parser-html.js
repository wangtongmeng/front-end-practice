// ?: 匹配不捕获
// arguments[0] = 匹配到的标签 arguments[1] 匹配到的标签名字
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` // abc-aaa
const qnameCapture = `((?:${ncname}\\:)?${ncname})` // <aaa:bbb>
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 匹配属性
const startTagClose = /^\s*(\/?)>/ // 匹配标签结束的 <div> <div />
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

let root = null // ast语法树的树根
let currentParent // 标识当前父亲是谁
let stack = []
// <div><p><span></span></p></div>
// [div] => [div, p] => [div, p, span] => [div, p] => [div] => [] => 空 开始标签与结束标签匹配
const ELEMENT_TYPE = 1
const TEXT_TYPE = 3

function createASTElement(tagName, attrs) {
    return {
        tag: tagName,
        type: ELEMENT_TYPE,
        children: [],
        attrs,
        parent: null
    }
}



function start (tagName, attrs) {
    // 遇到开始标签 就创建一个ast元素
    let element = createASTElement(tagName, attrs)
    if (!root) {
        root = element
    }
    currentParent = element // 把当前元素标记成父ast树
    stack.push(element) // 将开始元素存放到栈中
}
// <div><p></p></div> [div, p] => [div] p
function end(tagName) {
    // 复杂节点这里没有处理，例如注释、doctype节点，只处理核心逻辑
    let element = stack.pop() // 拿到的是ast对象
    // 标识当前p的父亲是div
    currentParent = stack[stack.length - 1]
    if (currentParent) {
        element.parent = currentParent
        currentParent.children.push(element) // 实现一个树的父子关系
    }

}
function chars(text) {
    text = text.replace(/\s/g, '')
    if (text) {
        currentParent.children.push({
            text,
            type: TEXT_TYPE
        })
    }
}
export function parseHTML(html) {
    // 不停地解析html字符串(截取)
    while (html) {
        let textEnd = html.indexOf('<')
        if (textEnd == 0) {
            // 如果当前索引为0 肯定是一个标签 开始标签 结束标签
            let startTagMatch = parseStartTag() // 获取tagName,attrs
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs) // 1 解析开始标签
                continue // 如果开始标签匹配完毕后 继续下一次匹配
            }
            let endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1]) // 2 解析结束标签
                continue
            }
        }
        let text
        if (textEnd >=0) {
            text = html.substring(0, textEnd)
        }
        if (text){
            advance(text.length)
            chars(text) // 3 解析文本
        }
    }
    function advance(n) {
        html = html.substring(n)
    }
    function parseStartTag() {
        let start = html.match(startTagOpen)
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length) // 删除标签
            let end,attr
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                // 解析属性
                advance(attr[0].length) // 删除属性
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
            }
            if (end) { // 去掉开始标签的 >
                advance(end[0].length)
                return match
            }
        }
    }
    return root
}