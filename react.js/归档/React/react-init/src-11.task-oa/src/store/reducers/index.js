import {
  combineReducers
} from 'redux'

import taskReducer from './taskReducer'
export default combineReducers({
  task: taskReducer
})