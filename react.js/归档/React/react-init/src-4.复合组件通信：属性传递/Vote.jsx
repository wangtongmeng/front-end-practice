import React from 'react'
import VoteHead from './VoteHead'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'

export default class Vote extends React.Component {
  // 支持人数由父组件进行管理
  state ={
    supNum: 0,
    oppNum: 0
  }
  render(){
    let title = this.props.title
    let {supNum, oppNum} = this.state
    return <div>
      <VoteHead title={title} total={supNum+oppNum}/>
      <VoteMain supNum={supNum} oppNum={oppNum}/>
      <VoteFooter callback={this.handle} />
    </div>
  }
  handle = type => {
    if(type === 'SUP'){
      this.setState({
        supNum: this.state.supNum + 10
      })
      return
    }
    this.setState({
      oppNum: this.state.oppNum + 1
    })
  }
}