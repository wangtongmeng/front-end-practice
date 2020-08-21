import * as TYPES from  '../action-types'
import api from '../../api'
const voteAction = {
  // action默认要求所有的派发的行为对象都是同步的：需要异步获取数据后再派发，则可以使用redux中间件 thunk/promise
  // 写成函数返回的形式，主要是为react-redux准备的
  queryAll(){
    // redux-thunk
    return async dispatch => {
      const data = await api.task.getTaskList(0)
      if (parseInt(data.code) === 0) {
        dispatch({
          type: TYPES.TASK_QUERY_ALL,
          payload: data.list
        })
      }
    }
  },
  queryAll2(){
    // redux-promise: 传递给reducer只能叫做payload
    return {
      type: TYPES.TASK_QUERY_ALL,
      payload: new Promise(async resolve => {
        const data = await api.task.getTaskList(0)
        if (parseInt(data.code) === 0) {
          resolve(data.list)
        }
      })
    }
  }
}
export default voteAction