// ast语法树 是用对象来描述原生语法的
// 虚拟dom 是用对象来描述dom节点的
import {parseHTML} from './parser-html'
import {generate} from './generate'

export function compileToFunction(template) {
    // 1) 解析html字符串 将html字符串 => ast 语法树
    let root = parseHTML(template)
    // 需要将ast语法树生成最终的render函数 就是字符串拼接（模板引擎）

    let code = generate(root)


    // 核心思路：将模板转化成下面的字符串
    // <div id="app"><p>hello {{name}}</p> hello</div>
    // 将ast树 再次转化成js的语法
    // _c("div",{id:app},_c("p",undefined,_v('hello' + _s(name))),_v('hello'))

    // 所有的模板引擎实现 都需要new Function + with
    let renderFn = new Function(`with(this){ return ${code} }`)
    return renderFn
}

