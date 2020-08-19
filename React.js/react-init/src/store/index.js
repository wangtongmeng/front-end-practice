/**
 * 创建 store 容器
 */
import { createStore } from 'redux'
import reducers from './reducers'

export default createStore(reducers)