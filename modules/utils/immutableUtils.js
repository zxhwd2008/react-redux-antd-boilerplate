const _getField = (state, field) => state.get(field)
const _setField = (state, field, value) => state.set(field, value)

export const setField = field => value => state => _setField(state, field, value)
export const getField = field => state => _getField(state, field)

export const getFieldFromState = stateDefination =>
  field => state => getField(field)(getField(stateDefination)(state))

export const getFieldsFromState = stateDefination =>
  fields => state => fields.reduce((previousFields, field) => {
      previousFields[field] = getField(field)(getField(stateDefination)(state))
      return previousFields;
    }, {});
