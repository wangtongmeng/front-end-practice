import React from 'react'
import PropTypes from 'prop-types'

export default class VoteFooter extends React.Component {
  static contextTypes = {
    handle: PropTypes.func
  }
  render() {
    let { handle } = this.context
    return <div>
      <button onClick={ev => {
        handle('SUP')
      }}>支持</button>
      <button onClick={ev => {
        handle('OPP')
      }}>反对</button>
    </div>
  }
}