import { createReducer } from 'modules/utils/reducerUtils'
import { ActionType } from 'modules/actions'
import { GithubManager } from './GithubManager'

export const githubManagerReducer = createReducer(GithubManager.create(), {
  [ActionType.GITHUBMANAGER.UPDATE_FIELD]:
  (state, action) => GithubManager[action.payload.field](action.payload.value)(state),
})

export const updateField = (field, value) => ({
  type: ActionType.GITHUBMANAGER.UPDATE_FIELD,
  payload: {
    field,
    value,
  },
})

export const searchGithubUser = (user) => ({
  type: ActionType.GITHUBMANAGER.FETCH_USER,
  payload: {
    user,
  },
})

export const searchGithubRepos = (user, repos) => ({
  type: ActionType.GITHUBMANAGER.FETCH_REPOSITORY,
  payload: {
    user,
    repos,
  },
})

export const searchGithubUserStarredRepos = (user) => ({
  type: ActionType.GITHUBMANAGER.FETCH_USER_STARRED_REPOS,
  payload: {
    user,
  },
})
