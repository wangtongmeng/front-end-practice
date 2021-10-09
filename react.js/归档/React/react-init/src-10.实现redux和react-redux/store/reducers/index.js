// 合并各版块的reducer
import { combineReducers } from 'redux'

import voteReducer from './voteReducer'
const reducer = combineReducers({
  /**
   * 合并后的reducer后期状态也是按照模块化划分
   * state = {
   *  vote: {
   *    title: 'xxx'
   *  }
   * }
   * store.getState().vote.title
   * 
   */
  vote: voteReducer
})
export default reducer