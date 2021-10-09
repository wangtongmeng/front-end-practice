import React from 'react'

export default class VoteFooter extends React.Component {
  render(){
    let {callback} = this.props
    return <div>
      <button onClick={ev => {
        callback('SUP')
      }}>支持</button>
      <button onClick={ev => {
        callback('OPP')
      }}>反对</button>
    </div>
  }
}