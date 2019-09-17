import React from 'react'
import ReactDOM from 'react-dom'

const user = { firstName: 'wang', lastName: 'tongmeng' }
function formatName(user) {
  return user.firstName + ' ' + user.lastName
}
const jsx = <h1>{formatName(user)}</h1>

ReactDOM.render(jsx, document.querySelector('#root'))