import * as TYPES from '../action-types'
const initState = {
  title: '姚明MVP',
  supNum: 0,
  oppNum: 0
}
export default function voteReducer(state = initState, action) {
  state = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case TYPES.VOTE_SUPPORT:
      state.supNum++
      break;
    case TYPES.VOTE_OPPOSE:
      state.oppNum++
  }

  return state
}