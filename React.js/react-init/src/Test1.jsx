import React from 'react'

// 创建上下文对象
const ThemeContext = React.createContext()

class Child extends React.Component {
  render(){
    return <div>
      我是孩子
    </div>
  }
}

class Parent extends React.Component {
  render(){
    return <div>
      我是父亲
      <Child />
    </div>
  }
}

export default Parent