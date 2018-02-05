import { LOCATION_CHANGE } from 'react-router-redux'
import { Router } from './Router'
import { createReducer } from 'modules/utils/reducerUtils'

export const routerReducer = createReducer(Router.create(), {
  [LOCATION_CHANGE]: (state, action) => Router.locationBeforeTransitions(action.payload)(state),
})
