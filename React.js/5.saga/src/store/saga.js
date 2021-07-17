import {put, take} from 'redux-saga/effects'
import * as types from './action-types'

export default function *rootSaga() {
    for (let i = 0; i < 3; i++) {
        yield take(types.ASYNC_ADD);
        yield put({type: types.ADD})
    }
}