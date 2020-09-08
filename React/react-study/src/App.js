import React, { Component } from 'react'
import JsxTest from './components/JsxTest'
import StateMgt from './components/StateMgt'
import EventHandle from './components/EventHandle'

// class App extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<h1>{this.props.title}</h1>
// 				<JsxTest />
// 			</div>
// 		)
// 	}
// }

// 函数式组件
function App(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      {/* <JsxTest /> */}
      <StateMgt></StateMgt>
      {/* <EventHandle></EventHandle> */}
    </div>
  )
}

export default App
