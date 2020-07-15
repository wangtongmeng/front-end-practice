import React from 'react'
/**
 * 受控组件：受状态管控的组件=>数据驱动视图渲染
 * 非受控组件：不受状态管控的组件(直接操作DOM => ref)
 */
export default class Clock extends React.Component {

  render() {
    return <div>
      {/* 方式一 */}
      {/* <input type="text" ref='inpBox' /> */}
      {/* 方式二(很多人喜欢) */}
      {/* <input type="text" ref={element => {
        // element：当前的元素对象
        this.INP = element
      }} /> */}
      {/* 方式二简化 */}
      <input type="text" ref={x => this.INP = x} />
    </div>
  }
  componentDidMount() {
    // console.log(this.refs); // {inpBox: input}
    {/* 方式一 */ }
    // this.refs.inpBox.focus()
    {/* 方式二 */ }
    this.INP.focus()
  }
}
