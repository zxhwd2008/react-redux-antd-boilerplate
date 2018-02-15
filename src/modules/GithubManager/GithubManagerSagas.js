import { takeEvery, call, all, put, select } from 'redux-saga/effects'
import { message } from 'antd'
import { Api } from 'services'
import { parseGithubLink } from 'modules/utils/parseGithubLink'
import { ActionType } from 'modules/actions'
import { updateNumberField as updateRootNumberField } from 'modules/Root'
import { GithubManager, updateField } from './index'

message.config({
  duration: 1,
})

export function* fetchGithubData(url, showError = false) {
  yield put(updateRootNumberField('currentTask', 1))
  const result = yield call(Api.get, url)
  yield put(updateRootNumberField('currentTask', -1))
  if (!result.error) {
    return result
  }
  if (showError) {
    message.error(result.error)
  }
  return false
}

export function* fetchUserStarredSideEffects(action) {
  const { user } = action.payload

  const page = yield select(state =>
    GithubManager.page()(state)
  )

  const sort = yield select(state =>
    GithubManager.sort()(state)
  )

  const [totalData, starredReposData] = yield all([
    yield call(fetchGithubData, 'users/' + user + '/starred?per_page=1'),
    yield call(fetchGithubData, 'users/' + user +
    '/starred?per_page=30&page=' + page + '&sort=' + sort),
  ])

  if (totalData && totalData.headers) {
    const linkHeaders = yield call(parseGithubLink, totalData.headers.get('link'))
    if (!linkHeaders) {
      yield put(updateField('totalStarredRepos', 0))
    } else {
      const last = linkHeaders && linkHeaders.last
      let total = last.split('?')[1]
      total = JSON.parse('{"' + decodeURI(total)
      .replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
      yield put(updateField('totalStarredRepos',
      total && total.page && parseInt(total.page, 10)))
    }
  }

  if (starredReposData) {
    yield put(updateField('starredRepos', starredReposData.response))
  }
}

export function* fetchUserSideEffects(action) {
  const { user } = action.payload
  const userData = yield call(fetchGithubData, 'users/' + user, true)
  if (userData) {
    yield put(updateField('user', userData.response))
  }
}

export function* fetchReposSideEffects(action) {
  const { user, repos } = action.payload
  const reposData = yield call(fetchGithubData, 'repos/' + user + '/' + repos, true)
  if (reposData) {
    yield put(updateField('repository', reposData.response))
  }
}

export function* watchGithubRequest() {
  yield all([
    takeEvery(ActionType.GITHUBMANAGER.FETCH_USER, fetchUserSideEffects),
    takeEvery(ActionType.GITHUBMANAGER.FETCH_REPOSITORY, fetchReposSideEffects),
    takeEvery(ActionType.GITHUBMANAGER.FETCH_USER_STARRED_REPOS, fetchUserStarredSideEffects),
  ])
}
