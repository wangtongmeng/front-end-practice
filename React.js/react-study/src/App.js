import React from 'react'
import JsxTest from './components/JsxTest'
import StateMgt from './components/StateMgt'
import EventHandle from './components/EventHandle'

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <JsxTest />        
//       </div>
//     );
//   }
// }

// 函数式组件
function App() {
  return (
    <div>
      {/* <JsxTest /> */}
      {/* <StateMgt></StateMgt> */}
      <EventHandle></EventHandle>
    </div>
  )
}

export default App