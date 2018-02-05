import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { RouterSelectors } from './Router'

const configureHistory = (store) => {
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: RouterSelectors.getRoutingField,
  })

  return history
}

export default configureHistory
