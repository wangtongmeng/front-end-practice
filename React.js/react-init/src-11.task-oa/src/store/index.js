/**
 * 创建 store 容器
 */
import { createStore, applyMiddleware } from 'redux'
// reduxLogger 在控制台打印出派发前后的状态；reduxPromise和reduxThunk都是用来处理异步操作的
import reduxLogger from 'redux-logger'
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'

export default createStore(reducers, applyMiddleware(reduxLogger, reduxPromise, reduxThunk))