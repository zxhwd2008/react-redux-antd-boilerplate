export const createReducer = (initialState, reducerMap) =>
  (state = initialState, action) => {
    const reducer = reducerMap[action.type]
    return reducer ? reducer(state, action) : state
  }

export const composeReducers = Field => fields => state =>
fields.reduce((preState, field) => Field[field.field](field.value)(preState), state)
