import React from 'react'
// react的核心：基础语法、属性、状态、生命周期、组件等
import ReactDOM from 'react-dom'
// ReactDOM把虚拟dom渲染成真是的dom
import './index.less'

// ReactDOM.render(jsx语法,容器,渲染完触发的回调函数)

// ReactDOM.render(<div>hello world</div>, document.getElementById('root'))
// 使用<></>，可以少一层嵌套

let str = 'zhangsan'
let arr = [10, 20, 30]
let boxStyle = {
  fontSize: '20px'
}

ReactDOM.render(<>
  <span className="box" style={boxStyle}>hello world</span>
  <div>{str} {arr} {null} {undefined}</div>
  {arr.map(item => {
    return <a href="" key={item}>{item}</a>
  })}
  {str ? 'zhangsan' : 'lisi'}

</>, document.getElementById('root'))