import {
  routerReducer,
} from 'modules/Router'
import { LOCATION_CHANGE } from 'react-router-redux'
import { expect } from 'chai';

describe('routerReducer', () => {
  it('should call the reducer and update locationBeforeTransitions field', () => {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        routing: 'test'
      },
    }

    const newState = routerReducer(undefined, action).toJS();

    expect(newState).to.deep.equal({
      locationBeforeTransitions: {
        routing: 'test',
      }
    })
  })
})
