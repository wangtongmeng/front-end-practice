import React from 'react'
import JsxTest from './components/JsxTest'
import StateMgt from './components/StateMgt'
import EventHandle from './components/EventHandle'


function App(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      {/* <JsxTest />     */}
      {/* <StateMgt />   */}
      <EventHandle />
    </div>
  )
}

export default App
