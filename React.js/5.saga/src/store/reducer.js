import * as types from './action-types'
export default function reducer(state={number:0}, action) {
    switch (action.type) {
        case types.ADD:
            return {number: state.number+1}
        default:
            return state
    }
}