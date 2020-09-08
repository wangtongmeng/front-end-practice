import React from 'react'
/**
 * 生命周期
 */
// export default class Clock extends React.Component {
//   // ========第一次调用组件渲染的周期流程
//   // 1.给属性设置默认值(设置默认规则)
//   // 2.constructor
//   //  =>设置初始的状态等
//   // 3.componentWillMount 第一次挂载之前
//   //  =>向服务器发送数据请求
//   // 4.render 渲染
//   // 5.componentDidMount 第一次挂在之后
//   // =>把虚拟DOM转换为真实DOM了，我们可以获取DOM元素进行操作

//   // =======当组件状态发生改变 setState
//   // 1.shouldComponentUpdate 是否允许当前组件重新渲染(返回true则继续重新渲染，返回false则停止重新渲染)
//   // 2.componentWIllUpdate 重新渲染之前
//   // 3.render重新渲染
//   // 4.componentWillUpdate 重新渲染之后

//   // =======当组件属性发生改变：父组件重新传递最新的属性信息
//   // 1.componentWillReceiveProps 在接收最新的属性之前
//   // 2.shouldComponentUpdate
//   // ...

//   // componentWillUnmount 卸载组件之前

//   constructor(props){
//     super(props)
//     console.log('constructor');
//     this.state = {
//       data: [],
//       n: 0
//     }

//   }
//   componentWillMount(){
//     console.log('componentWillMount');
//     setTimeout(()=>{
//       this.setState({
//         data: [100,200]
//       })
//     })
//   }

//   render(){
//     console.log('render');
//     let { data, n } = this.state
//     return <div>
//       {data}====={n}
//       <button onClick={()=>{
//         this.forceUpdate()
//       }}>强制更新</button>
//     </div>
//   }
//   componentDidMount(){
//     console.log('componentDidMount');
//   }

//   shouldComponentUpdate(nextProps, nextState){
//     console.log('shouldComponentUpdate', nextProps, nextState);
//     // nextProps nextState 最新要修改的属性和状态
//     // this.state / this.props 修改之前的
//     // this.forceUpdate() 不会执行这个周期函数，会强制更新当前组件
//     return true
//   }

//   componentWillUpdate(){
//     console.log('componentWillUpdate');
//   }
//   componentDidUpdate(){
//     console.log('componentDidUpdate');
//   }

// }

export default class Clock extends React.PureComponent {
  // export default class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      n: 0,
      x: [10]
    }

  }
  render(){
    console.log('render');
    let { n, x } = this.state
    return <div>
      {n} ========== {x}
      {/* 执行函数保持this，方式1 */}
      {/* <button onClick={this.handle.bind(this)}>+</button> */}
      {/* 执行函数保持this，方式2 */}
      <button onClick={this.handle}>+</button>
    </div>
  }
  // PureComponent相对于Component来说，内部给组件加了shouldComponentUpdate：把属性和状态进行"浅对比"，以此优化性能(自己设置了shouldComponentUpdate，以自己设置的为主)
  // shouldComponentUpdate(nextProps, nextState){
  //   // 拿当前的状态和最新修改的状态进行对比(浅对比)，如果一样则不渲染，不一样才进行渲染
  //   if (this.state.n === nextState.n) {
  //     return false
  //   }
  //   return true
  // }
  // 执行函数保持this，方式2
  handle = ev => {
    // console.log(this, ev);
    let arr = this.state.x
    arr.push(30)
    console.log(arr);
    this.setState({
      // 不管状态是否改变，都会控制render重新渲染
      // n: this.state.n + 1
      // x: arr // PureComponent浅比较，堆内存地址没变，所以不更新
      x: [...arr]
    })
  }
  //  执行函数保持this，方式1
  // handle(ev){
  //   // this是undefined(react中的事件是合成事件=>所有的事件都是进行事件代理的，而且事件对象也是合成的)
  //   ev.persist() // 把合成事件对象中的值暴露出来
  //   console.log(this, ev, ev.clientX);
  // }
}
