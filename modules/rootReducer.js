import { combineReducers } from 'redux-immutable'
import { Router, routerReducer } from './Router'

const rootReducer = combineReducers({
  [Router.name]: routerReducer,
})

export default rootReducer
