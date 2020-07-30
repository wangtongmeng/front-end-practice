import React from 'react'
import VoteHead from './VoteHead'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'

export default class Vote extends React.Component {
  render() {
    const store = this.props.store
    return <>
      <VoteHead store={store} />
      <VoteMain store={store} />
      <VoteFooter store={store} />
    </>
  }
}