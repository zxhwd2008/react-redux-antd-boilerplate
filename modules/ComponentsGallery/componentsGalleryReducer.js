import { createReducer, composeReducers } from '../utils/reducerUtils'
import { ComponentsGallery } from './ComponentsGallery'
import { ActionType } from '../actions'

export const componentsGalleryReducer = createReducer(ComponentsGallery.create(), {
  [ActionType.ComponentsGallery.UPDATE_FIELD]:
  (state, action) => ComponentsGallery[action.payload.field](action.payload.value)(state),
})


export const updateField = (field, value) => ({
  type: ActionType.ComponentsGallery.UPDATE_FIELD,
  payload: {
    field,
    value,
  },
})
