import { all, fork } from 'redux-saga/effects'
import { watchGithubRequest } from 'modules/GithubManager'

export default function* rootSagas() {
  yield all([
    fork(watchGithubRequest),
  ])
}
