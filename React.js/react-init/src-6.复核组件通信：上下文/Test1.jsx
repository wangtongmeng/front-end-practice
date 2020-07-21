import React from 'react'

// 创建上下文对象
const ThemeContext = React.createContext()

class Child extends React.Component {
  // static contextType = ThemeContext // 获取方式1，基于this.context来使用即可
  render(){
    // console.log(this.context); // 方式1
    return <ThemeContext.Consumer>
      {context => {
        return <>
          我是孩子 {context.n} {context.m}
        </>
      }}
    </ThemeContext.Consumer>
  }
}

class Parent extends React.Component {
  render(){
    return <ThemeContext.Provider value={{
      // 提供上下文信息
      n: 10,
      m: 20
    }}>
      我是父亲
      <Child />
    </ThemeContext.Provider>
  }
}

export default Parent