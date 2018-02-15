import { LOCATION_CHANGE } from 'react-router-redux'
import { createReducer } from 'modules/utils/reducerUtils'
import { Router } from './Router'

export const routerReducer = createReducer(Router.create(), {
  [LOCATION_CHANGE]: (state, action) => Router.locationBeforeTransitions(action.payload)(state),
})
