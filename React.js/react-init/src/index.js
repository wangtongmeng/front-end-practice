import React from 'react'
import ReactDOM from 'react-dom'
import Vote from './Vote'
import store from './store'
import { Provider } from 'react-redux'
// Provider：把创建的store挂载到祖先元素的上下文中

ReactDOM.render(<Provider store={store}>
  <Vote />
</Provider>, document.getElementById('root'))

