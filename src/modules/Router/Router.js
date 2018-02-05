import { getField } from '../utils/immutableUtils'
import { createState } from '../utils/createState'

export const Router = createState({
  name: 'routing',
  fields: {
    locationBeforeTransitions: {},
  },
})

const getRoutingField = getField(Router.name)

export const RouterSelectors = {
  getRoutingField,
}
