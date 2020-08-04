import * as TYPES from  '../action-types'
const voteAction = {
  // 写成函数返回的形式，主要是为react-redux准备的
  changeSupNum() {
    return {
      type: TYPES.VOTE_SUPPORT
    }
  },
  changeOppNum() {
    return {
      type: TYPES.VOTE_OPPOSE
    }
  }
}
export default voteAction