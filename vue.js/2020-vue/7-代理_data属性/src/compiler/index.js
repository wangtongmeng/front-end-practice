// ast语法树 是用对象来描述原生语法的
// 虚拟dom 是用对象来描述dom节点的
import {parseHTML} from './parser-html'

function genProps(attrs) { // 处理属性 拼接成属性的字符串
    // [{name: 'id',value: 'app'},...]
    let str = ''
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        if (attr.name === 'style') {
            // style="color: red;fontSize:14px" => {style:{color: 'red'}}
            let obj = {}
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(':')
                obj[key] = value
            })
            attr.value = obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, -1)}}`
}
function generate(el) {
    let code = `_c("${el.tag}"),${
        el.attrs.length ? genProps(el.attrs) : 'undefined'
    }

    `
    return code
}

export function compileToFunction(template) {
    // 1) 解析html字符串 将html字符串 => ast 语法树
    let root = parseHTML(template)
    // 需要将ast语法树生成最终的render函数 就是字符串拼接（模板引擎）

    let code = generate(root)


    // 核心思路：将模板转化成下面的字符串
    // <div id="app"><p>hello {{name}}</p> hello</div>
    // 将ast树 再次转化成js的语法
    // _c("div",{id:app},_c("p",undefined,_v('hello' + _s(name))),_v('hello'))
    console.log(code)
    return function render() {

    }
}


