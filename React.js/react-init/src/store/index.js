/**
 * 创建 store 容器
 */
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer)
export default store