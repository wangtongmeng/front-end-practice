import React from 'react'

export default class VoteFooter extends React.Component {
  render(){
    let {eventBus}=this.props
    return <div>
      <button onClick={ev => {
        eventBus.$emit('plus', 'SUP')
      }}>支持</button>
      <button onClick={ev => {
        eventBus.$emit('plus', 'OPP')
      }}>反对</button>
    </div>
  }
}