import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const root = document.getElementById('root')

class Dialog extends React.Component {
  // static defaultProps 这样是不符合ES6规范的，但是webpack打包编译时会把它转换为Dialog.defaultProps这种符合规范的语法
  // this.props是只读的，我们无法在方法中修改它的值，但是可以给其设置默认值或者设置一些规则（例如：设置是否是必须传递的以及传递值得类型等）
  static defaultProps = {
    lx: '系统提示'
  }

  // prop-types是facebook公司开发的一个插件，基于这个插件我们可以给组件传递的属性设置规则（设置的规则不会影响页面的渲染，但是会在控制台抛出警告错误）
  static propTypes = {
    // con: PropTypes.string // 传递的内容需要时字符串
    con: PropTypes.string.isRequired // 不仅传递的内容时字符串，并且必传
  }

  constructor() { 
    super()

    console.log(this.AA)
    console.log(this.fn())
  }

  // 类似的这样写也是可以的（不是合法的ES6语法，但是webpack会把它编译 => babel-preset-react）
  AA = 12
  fn = () => {
    console.log(1)
  }

  render() {
    // this.props.con = '嘿嘿嘿' // TypeError: Cannot assign to read only property 'con' of object '#<Object>' 组件中的属性是调取组件时（创建类实例的时候）传递给组件的信息，而这部分信息是"只读的"（只能获取不能修改）=>"组件的属性是只读的"

    let {lx, con} = this.props

    return <section>
      <h3>{lx}</h3>
      <div>{con}</div>
    </section>
  }
}

ReactDOM.render(<div>
  <Dialog con='哈哈哈'>
    <span>子元素</span>
  </Dialog>
</div>, root)