import { combineReducers } from 'redux-immutable'
import { Router, routerReducer } from './Router'
import { GithubManager, githubManagerReducer } from './GithubManager'

const rootReducer = combineReducers({
  [Router.name]: routerReducer,
  [GithubManager.name]: githubManagerReducer,
})

export default rootReducer
