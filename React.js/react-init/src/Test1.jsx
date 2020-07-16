import React from 'react'

export default class Test1 extends React.Component {
  // this.state = x
  state = {
    n: 0,
    m: 0
  }
  render() {
    console.log('render');
    return <div>
      {this.state.n} ========= {this.state.m}
      <button onClick={this.handle}>+</button>
      <button ref={x=>this.btn = x}>+</button>
    </div>
  }
  componentDidMount(){
    this.btn.addEventListener('click', ()=>{
      this.setState({
        n: 10
      })
      console.log('OK');
    })
  }
  // componentDidMount() {
  //   this.setState({
  //     n: this.state.n + 1
  //   })
  // }
  handle = () => {
    this.setState({
      n: 10
    }, () => {
      // 本次更新完成后触发执行
    })
    // this.setState({
    //   n: 10
    // })
    // this.setState({
    //   m: 20
    // })
    // this.setState({
    //   n: 30
    // })
    // console.log('ok');
    setTimeout(()=>{
      this.setState({
        n: 10
      })
      this.setState({
        n: 20
      })
      console.log('OK');
    },1000)
  }
}
/**
 * setState本身在生命周期函数或者在合成事件中执行时异步的
 * =>保证react本身生命周期函数执行的顺序不紊乱
 * =>保证其实现渲染队列的机制 可以合并setState统一渲染
 * 
 * 在原生的事件绑定中和其他异步操作中的setState是同步的
 * =>没有渲染队列效果了
 */