import React from 'react'
import ReactDOM from 'react-dom'
import Vote from './Vote'
import Parent from './Test1'
ReactDOM.render(<>
  <Parent />

  <Vote title='姚明MVP'/>
  <Vote title='奥尼尔好重'/>
</>, document.getElementById('root'))

