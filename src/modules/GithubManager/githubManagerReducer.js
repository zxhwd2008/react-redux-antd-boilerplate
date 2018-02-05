import { createReducer } from 'modules/utils/reducerUtils'
import { GithubManager } from './GithubManager'
import { ActionType } from 'modules/actions'

export const githubManagerReducer = createReducer(GithubManager.create(), {
  [ActionType.GITHUBMANAGER.UPDATE_FIELD]:
  (state, action) => GithubManager[action.payload.field](action.payload.value)(state),
})
