import * as TYPES from  '../action-types'
const voteAction = {
  // 写成函数返回的形式，主要是为react-redux准备的
  queryAll(){
    return {
      types: TYPES.TASK_QUERY_ALL,
      payload: []
    }
  }
}
export default voteAction