import React from 'react'
// 安装的第三方插件，设置属性的规则
import PropTypes from 'prop-types' // https://github.com/facebook/prop-types
/**
 * 函数式组件的特点
 * =>静态组件
 * =>每一次调用组件，都会重新渲染和计算，把渲染后的结果呈现在页面中
 * =>渲染完成后，呈现的内容不会改变，除非重新调用该组件
 */
// export default function Clock(){
//   return <div>
//     {new Date().toLocaleString()}
//   </div>
// }

/**
 * 类组件：创建一个类，让其继承React.Component或者React.PureComponent，此类被称为类组件
 * =>动态组件
 * =>react中基于状态来管理动态组件(类组件)
 *  =>设置初始状态值
 *  =>修改状态：setState修改组件状态及重新渲染
 */
export default class Clock extends React.Component {
  // 属性设置规则
  static defaultProps = {
    m: 100
  }
  static propTypes = {
    m: PropTypes.number,
    x: PropTypes.string.isRequired
  }
  // constructor： 调用组件，创建类的一个实例，首先执行constructor 把属性、上下文等信息传递进来
  constructor(props){
    super(props) // React.Component.call(this, props)
    console.log(this.props); // 为了能在construtor中通过this.props访问属性，采用super(props) 源码react.development.js 427行
    // 属性和函数式组件一样包含普通属性和子节点属性children，同样只读
    // 只有constructor执行完，才会把props挂载到实例上 
    // 创建初始状态
    this.state = {
      time: new Date().toLocaleString(),
      n: 0
    }
  }
  // render：渲染组件的内容
  render(){
    console.log(this.props);
    return <div>
      {this.state.time}
      ===========
      {this.state.n}
    </div>
  }
  // componentDidMount：生命周期 第一次渲染完 
  componentDidMount(){
    setInterval(()=>{
      // 能改变数据，但不能同时组件重新渲染数据
      // this.state.time = new Date().toLocaleString()
      // 源码：node_modules/react/cjs/react.development 搜索Component.prototype.setState
      // 修改状态，并且通知组件重新渲染
      // partialState 部分状态
      // callback 回调函数(状态修改，组件重新渲染后，触发的回调函数)
      this.setState({
        time: new Date().toLocaleString()
      })
    }, 1000)
  }
}
