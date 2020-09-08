import React from 'react'
import action from './store/actions/index'

export default class VoteFooter extends React.Component {
  render() {
    return <>
      <button onClick={ev => {
        this.props.store.dispatch(action.vote.changeSupNum())
      }}>支持</button>
      <button onClick={ev => {
        this.props.store.dispatch(action.vote.changeOppNum())
      }}>反对</button>
    </>
  }
}