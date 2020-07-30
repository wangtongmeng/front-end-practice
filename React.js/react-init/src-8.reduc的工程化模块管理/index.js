import React from 'react'
import ReactDOM from 'react-dom'
import Vote from './Vote'
import store from './store'

ReactDOM.render(<Vote store={store} />, document.getElementById('root'))

