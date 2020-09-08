import * as TYPES from '../action-types'

const initState = {
  taskList: null
}
export default function taskReducer(state = initState, action) {
  state = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case TYPES.TASK_QUERY_ALL:
      state.taskList = action.payload
      break
  }
  return state

}