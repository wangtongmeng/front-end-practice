import * as TYPES from '../action-types'

const initState = {
  taskList: null
}
export default function taskReducer(state = initState, action) {
  state = JSON.parse(JSON.stringify(state))

  return state

}