import { getField } from 'modules/utils/immutableUtils'
import { createState } from 'modules/utils/createState'

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
