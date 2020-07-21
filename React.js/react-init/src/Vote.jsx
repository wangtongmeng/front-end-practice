import React from 'react'
import VoteHead from './VoteHead'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'

export default class Vote extends React.Component {

  render() {
    return <div>
      <VoteHead />
      <VoteMain />
      <VoteFooter />
    </div>
  }
}