import {
  rootReducer,
  updateNumberField,
  } from 'modules/Root'
import { ActionType } from 'modules/actions'
import { expect } from 'chai';

describe('rootReducer', () => {
  it('should return action updateField', () => {
    const action = updateNumberField('field', 'value')
    expect(action).to.deep.equal({
      type: ActionType.ROOT.UPDATE_NUMBER_FIELD,
      payload: {
        field: 'field',
        value: 'value',
      },
    })
  })

  it('should call the reducer and update currentTask field', () => {
    const action = {
      type: ActionType.ROOT.UPDATE_NUMBER_FIELD,
      payload: {
        field: 'currentTask',
        value: 1,
      },
    }

    const newState = rootReducer(undefined, action).toJS();

    expect(newState).to.deep.equal({
      currentTask: 1,
    })
  })
})
