import { call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { LOCATION_CHANGE } from 'react-router-redux'
import { ActionType } from '../actions'

export function* locationChangeSideEffects(action) {
  const pathnames = action.payload.pathname.split('/')
}

export function* watchContractSend() {
  yield takeEvery(LOCATION_CHANGE, locationChangeSideEffects)
}
