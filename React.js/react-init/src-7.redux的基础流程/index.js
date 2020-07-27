import React from 'react'
import ReactDOM from 'react-dom'
import Vote from './Vote'
/* redux */
import { createStore } from 'redux'
// reducer修改容器状态的唯一途径
function reducer(state = {
  // 原始容器中的状态信息，没有设置初始值
  supNum: 0,
  oppNum: 0,
  title: '姚明MVP'
}, action) {
  // action是dispatch派发的行为对象(action.type行为标识)
  state = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    // 通过不同的行为标识修改不同的状态
    case 'SUPPORT':
      state.supNum++
      break;
    case 'OPPOSE':
      state.oppNum++
      break
  }
  // 返回值会替换原始容器中的状态信息
  return state
}
const store = createStore(reducer)

ReactDOM.render(<Vote store={store} />, document.getElementById('root'))

