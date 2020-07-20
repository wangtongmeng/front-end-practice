import React from 'react'
import VoteHead from './VoteHead'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'
import subscribe from './subscribe'

export default class Vote extends React.Component {
  constructor(props){
    super(props)
    // 创建一个单独的事件池
    this.eventBus = subscribe()
  }
  render(){
    let title = this.props.title
    return <div>
      <VoteHead title={title} eventBus={this.eventBus}/>
      <VoteMain eventBus={this.eventBus} />
      <VoteFooter eventBus={this.eventBus} />
    </div>
  }
}