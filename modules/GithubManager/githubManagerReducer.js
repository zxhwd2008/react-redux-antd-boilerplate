import { createReducer } from '../utils/reducerUtils'
import { Customer } from './Customer'
import { ActionType } from '../actions'

export const customerReducer = createReducer(Customer.create(), {
  [ActionType.CUSTOMER.UPDATE_FIELD]:
  (state, action) => Customer[action.payload.field](action.payload.value)(state),
})

export const updateField = (field, value) => ({
  type: ActionType.CUSTOMER.UPDATE_FIELD,
  payload: {
    field,
    value,
  },
})

export const send = (resolve, reject) => ({
  type: ActionType.CUSTOMER.SEND,
  meta: {
    resolve,
    reject,
  },
})

export const fetchCarData = (field, resource) => ({
  type: ActionType.CUSTOMER.FETCH_CAR_DATA,
  payload: {
    resource,
    field,
  },
})
