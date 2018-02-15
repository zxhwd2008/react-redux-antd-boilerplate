import { combineReducers } from 'redux-immutable'
import { Root, rootReducer as rootModuleReducer } from './Root'
import { Router, routerReducer } from './Router'
import { GithubManager, githubManagerReducer } from './GithubManager'

const rootReducer = combineReducers({
  [Root.name]: rootModuleReducer,
  [Router.name]: routerReducer,
  [GithubManager.name]: githubManagerReducer,
})

export default rootReducer
