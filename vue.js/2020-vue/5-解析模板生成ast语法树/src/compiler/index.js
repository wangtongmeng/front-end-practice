// ast语法树 是用对象来描述原生语法的
// 虚拟dom 是用对象来描述dom节点的
import {parseHTML} from './parser-html'

export function compileToFunction(template) {
    // 1) 解析html字符串 将html字符串 => ast 语法树
    let root = parseHTML(template)
    console.log('root', root)
    return function render() {

    }
}


