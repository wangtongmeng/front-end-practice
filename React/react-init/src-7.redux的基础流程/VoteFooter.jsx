import React from 'react'

export default class VoteFooter extends React.Component {
  render() {
    const ThemeContext = window.ThemeContext
    return <ThemeContext.Consumer>
      {context => {
        this.context = context
        return <>
          <button onClick={ev => {
            // 派发行为给reducer，让其修改容器中的状态信息
            this.context.store.dispatch({
              type: 'SUPPORT'
            })
          }}>支持</button>
          <button onClick={ev => {
              this.context.store.dispatch({
                type: 'OPPOSE'
              })
          }}>反对</button>
        </>
      }}
    </ThemeContext.Consumer>
  }
}