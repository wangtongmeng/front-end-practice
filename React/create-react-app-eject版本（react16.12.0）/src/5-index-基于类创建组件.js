import React from 'react';
import ReactDOM from 'react-dom'; 

const root = document.getElementById('root')

function Sum(props) {
  console.log(this);//=>undeifned
  return <div>
      函数式声明
  </div>;
}

// class Dialog extends React.Component {
//   constructor(props) { // props, context, updater
//     // props：当render渲染并且把当前类执行创建实例时，会把之前jsx解析出来的props对象（可能有children）中的信息传递给参数props => "调取组件传递的属性"

//     super(props) // es6中的extends继承，一旦使用了constructor，第一行位置必须设置super执行：相当于React.Component.call(this)，也就是call继承，把父类私有的属性继承过来
//       // 如果只写super()：虽然创建实例时把属性传递进来了，但是没有传递给父组件，也就是没有把属性挂载到实例上，使用this.props获取的结果是undefined
//       // 如果写super(props)：在继承父类私有属性时，就把传递的属性挂载到了子类实例上，constructor中就可以使用this.props了
//     /**
//      * this.props：属性集合
//      * this.refs：ref集合（非受控组件中用到）
//      * this.context：上下文
//      */
//     console.log(props)
//     console.log(this.props)
//   }

//   render() {
//     return <section>
//       <h3>系统提示</h3>
//       <div></div>
//     </section>
//   }
// }

class Dialog extends React.Component {
  constructor() { 
    super()
    // 即使在constructor中不设置形参props接收属性，执行super时也不传这个属性，除了constructor中不能直接使用this.props，其他声明周期函数中都可以使用（也就是执行完成constructor，react已经帮我们把传递的属性接收，并且挂在到实例上了）
  }

  componentWillMount() {
    // 第一次渲染之前
    console.log(this.props)
  }

  render() {
    // this.props.con = '嘿嘿嘿' // TypeError: Cannot assign to read only property 'con' of object '#<Object>' 组件中的属性是调取组件时（创建类实例时）传递给组件的信息，而这部分信息是"只读"的（只能获取不能修改）=>组件的属性是只读的 
    let {lx, con} = this.props

    return <section>
      <h3>{lx}</h3>
      <div>{con}</div>
    </section>
  }
}

ReactDOM.render(<div>
  <Dialog lx='系统提示' con='哈哈哈'>
    <span>子元素</span>
  </Dialog>
</div>, root)