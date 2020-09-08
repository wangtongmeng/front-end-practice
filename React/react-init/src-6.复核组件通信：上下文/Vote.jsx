import React from 'react'
import VoteHead from './VoteHead'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'
import PropTypes from 'prop-types'

export default class Vote extends React.Component {
  // 设置组件上下文中需要存放的内容
  static childContextTypes = {
    title: PropTypes.string,
    supNum: PropTypes.number,
    oppNum: PropTypes.number,
    handle: PropTypes.func
  }
  getChildContext() {
    // 当状态改变的时候，此方法也会被触发执行，更新给后代所用的上下文信息
    return {
      title: this.props.title,
      supNum: this.state.supNum,
      oppNum: this.state.oppNum,
      handle: this.handle
    }
  }
  state = {
    supNum: 0,
    oppNum: 0
  }

  handle = type => {
    if (type === 'SUP') {
      this.setState({
        supNum: this.state.supNum + 1
      })
      return
    }
    this.setState({
      oppNum: this.state.oppNum + 1
    })
  }

  render() {
    return <div>
      <VoteHead />
      <VoteMain />
      <VoteFooter />
    </div>
  }
}