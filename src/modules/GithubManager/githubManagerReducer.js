import { createReducer } from '../utils/reducerUtils'
import { GithubManager } from './GithubManager'
import { ActionType } from '../actions'

export const githubManagerReducer = createReducer(GithubManager.create(), {
  [ActionType.GITHUBMANAGER.UPDATE_FIELD]:
  (state, action) => GithubManager[action.payload.field](action.payload.value)(state),
})
