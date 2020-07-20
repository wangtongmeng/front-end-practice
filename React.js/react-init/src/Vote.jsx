import React from 'react'
import VoteHead from './VoteHead'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'

export default class Vote extends React.Component {
  render(){
    let title = this.props.title
    return <div>
      <VoteHead title={title}/>
      <VoteMain />
      <VoteFooter />
    </div>
  }
}